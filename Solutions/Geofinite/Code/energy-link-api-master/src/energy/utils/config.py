import importlib
import inspect
import pkgutil

from pathlib import Path
from pyhocon import ConfigTree, ConfigFactory


class Config:
    def __init__(self, config: ConfigTree) -> None:
        self.config = config

    @classmethod
    def load(cls, config_name="reference.conf"):
        frame = inspect.stack()[1]
        module = inspect.getmodule(frame[0])
        loader = pkgutil.get_loader(module.__name__)
        base = Path(loader.path).parent

        config = ConfigFactory.parse_file(str(base / config_name))
        return cls(config)

    def __getitem__(self, item):
        return self.config[item]

    def __getattr__(self, item):
        return getattr(self.config, item)
