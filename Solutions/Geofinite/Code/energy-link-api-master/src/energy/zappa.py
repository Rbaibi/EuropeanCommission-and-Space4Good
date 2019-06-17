from energy import create_app
from energy.utils.config import Config

config = Config.load()
app = create_app(config)
