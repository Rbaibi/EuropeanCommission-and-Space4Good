import os
import logging

logging.basicConfig(level=getattr(logging, os.environ.get("LOG_LEVEL", "info").upper()))

from energy import create_app
from energy.utils.config import Config

config = Config.load()
app = create_app(config)

app.run(host=config["energy"]["host"], port=config["energy"]["port"], debug=config["energy"]["debug"])
