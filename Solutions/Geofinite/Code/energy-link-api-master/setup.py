from setuptools import setup, PEP420PackageFinder

setup(
    name="energy-link-api",
    packages=PEP420PackageFinder.find(where="src"),
    package_dir={"": "src"},
    package_data={
        "energy": ["reference.conf"]
    },
)

