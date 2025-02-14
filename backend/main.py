from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, func
from sqlalchemy.ext.declarative import declarative_base
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List


app = FastAPI(title="Invitación Digital Babyshower")

# Permitir solicitudes desde GitHub Pages
origins = [
    "https://castlewhites.github.io",
    "http://localhost:3000",  # Para pruebas locales (opcional)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)




# --- Configuración de la base de datos SQLite ---
SQLALCHEMY_DATABASE_URL = "postgresql://sebastian:CCnLLxCHb0hs1NsFyqgoFlB66xFt9eXT@dpg-cunc1ia3esus73cfbqf0-a.oregon-postgres.render.com/invitacion_samuel"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Modelos de datos (Tablas) ---

# Modelo para confirmar asistencia
class Attendance(Base):
    __tablename__ = "attendances"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cupos = Column(Integer)

# Modelo para guardar deseos/mensajes
class Wish(Base):
    __tablename__ = "wishes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    message = Column(String)

class Gift(Base):
    __tablename__ = "gifts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    cupos = Column(Integer)
    image_url = Column(String)

class GiftChoice(Base):
    __tablename__ = "gift_choices"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    gift = Column(String)



# Se crean las tablas en la base de datos (si no existen)
Base.metadata.create_all(bind=engine)

class AsistenciaRequest(BaseModel):
    nombre: str
    cupos: int

class WishRequest(BaseModel):
    nombre: str
    mensaje: str

class GiftChoiceRequest(BaseModel):
    nombre: str
    regalos: List[str]



# --- Dependencia para obtener la sesión de la base de datos ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Endpoints ---

# Endpoint para confirmar asistencia
@app.post("/asistencia")
def confirmar_asistencia(asistencia: AsistenciaRequest, db: Session = Depends(get_db)):
    attendance = Attendance(name=asistencia.nombre, cupos=asistencia.cupos)
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return {"success": True, "id": attendance.id}

# Endpoint para enviar deseos
@app.post("/deseos")
def enviar_deseos(wish_data: WishRequest, db: Session = Depends(get_db)):
    wish = Wish(name=wish_data.nombre, message=wish_data.mensaje)
    db.add(wish)
    db.commit()
    db.refresh(wish)
    return {"success": True, "id": wish.id}

@app.post("/regalo")
def guardar_regalo(gift_data: GiftChoiceRequest, db: Session = Depends(get_db)):
    # Buscar el regalo en la base de datos
    gifts = db.query(Gift).filter(Gift.name.in_(gift_data.regalos)).all()


    if len(gifts) != len(gift_data.regalos):
        raise HTTPException(status_code=404, detail="Uno o más regalos no fueron encontrados")

    for gift in gifts:
        if gift.cupos <= 0:
            raise HTTPException(status_code=400, detail=f"El regalo '{gift.name}' ya no tiene cupos disponibles")

    # Restar 1 al cupo del regalo
    for gift in gifts:
        gift.cupos -= 1

    db.commit()  # Confirmar los cambios en la base de datos

    # Guardar la elección del regalo en la tabla GiftChoice
    gift_choice = GiftChoice(
        name=gift_data.nombre,
        gift=", ".join(gift_data.regalos)  # Guardar los nombres de los regalos elegidos
    )
    db.add(gift_choice)
    db.commit()
    db.refresh(gift_choice)

    return {"message": "Regalos guardados correctamente"}

# Opcional: Endpoints para listar los registros (útil para debugging o administración)
@app.get("/asistencias", response_model=List[dict])
def get_asistencias(db: Session = Depends(get_db)):
    attendances = db.query(Attendance).all()
    return [{"id": a.id, "name": a.name, "cupos": a.cupos} for a in attendances]

@app.get("/deseos/list", response_model=List[dict])
def get_deseos(db: Session = Depends(get_db)):
    wishes = db.query(Wish).all()
    return [{"id": w.id, "name": w.name, "message": w.message} for w in wishes]

@app.get("/regalos/list", response_model=List[dict])
def get_regalos(db: Session = Depends(get_db)):
    regalos = db.query(Gift).filter(Gift.cupos > 0).all()
    return [{"id": c.id, "name": c.name, "cupos": c.cupos, "image_url": c.image_url} for c in regalos]

@app.get("/regalos/elegidos", response_model=List[dict])
def get_gift_choices(db: Session = Depends(get_db)):
    gift_choices = db.query(GiftChoice).all()
    return [{"id": gc.id, "name": gc.name, "gifts": gc.gift} for gc in gift_choices]
