from sqlalchemy.orm import Session
from main import SessionLocal
from main import Gift

def seed_gifts():
    db: Session = SessionLocal()
    try:
        # Verificar si ya existe algún regalo en la tabla
        if db.query(Gift).first() is None:
            # Lista de regalos iniciales
            gifts = [
                Gift(
                    name="ALMOHADA MATERNA",
                    cupos=1,
                    image_url="/assets/regalos/ALMOHADA.png"
                ),
                Gift(
                    name="GIMNASIO PARA BEBÉ",
                    cupos=1, 
                    image_url="/assets/regalos/GIMNASIO.png"
                ),
                Gift(
                    name="BODYS PARA BEBÉ",
                    cupos= "10", 
                    image_url="/assets/regalos/BODYS.png"
                ),Gift(
                    name="COMEDOR 7 EN 1",
                    cupos=1, 
                    image_url="/assets/regalos/COMEDOR.png"
                ),Gift(
                    name="KIT PRODUCTOS DE ASEO",
                    cupos=1, 
                    image_url="/assets/regalos/ASEO.png"
                ),Gift(
                    name="KIT DE TETEROS",
                    cupos=1, 
                    image_url="/assets/regalos/TETEROS.png"
                ),Gift(
                    name="EXTRACTORES",
                    cupos=1, 
                    image_url="/assets/regalos/EXTRACTORES.png"
                ),Gift(
                    name="PIJAMAS",
                    cupos=10, 
                    image_url="/assets/regalos/PIJAMAS.png"
                ),
                Gift(
                    name="TERMOMETRO",
                    cupos=1, 
                    image_url="/assets/regalos/TERMOMETRO.png"
                ),Gift(
                    name="MANTAS O COBIJAS",
                    cupos=10, 
                    image_url="/assets/regalos/MANTAS.png"
                ),Gift(
                    name="COCHE",
                    cupos=1, 
                    image_url="/assets/regalos/COCHE.png"
                ),Gift(
                    name="CAMBIADOR",
                    cupos=1, 
                    image_url="/assets/regalos/CAMBIADOR.png"
                ),Gift(
                    name="JUGUETES",
                    cupos=1, 
                    image_url="/assets/regalos/JUGUETES.png"
                ),
                Gift(
                    name="ROPA PARA BEBÉ",
                    cupos=1, 
                    image_url="/assets/regalos/ROPA.png"
                ),
            ]
            db.add_all(gifts)
            db.commit()
            print("Datos iniciales de regalos agregados correctamente.")
        else:
            print("La tabla de regalos ya contiene datos.")
    except Exception as e:
        print("Error al insertar datos iniciales:", e)
    finally:
        db.close()

if __name__ == "__main__":
    seed_gifts()
