# European Commission and Space4Good Challenge
2nd edition of the Hackathon for Peace, Justice and Security

https://www.hackathonforgood.org

## AN ENERGY TRADE MARKETPLACE FOR LOCAL ENERGY COMMUNITIES   
**Problem:**  In 2018, more than 50 million people in Europe were experiencing energy poverty, a situation where households are not able to adequately meet their energy needs (heating, lighting, cooling) at an affordable cost.

European initiatives such as the EU Energy Poverty Observatory (EPOV) and the New Deal for Energy Consumers are meant to help member states combat energy poverty, and to acknowledge the role of local energy initiatives as facilitators for consumer participation in the energy market.

**Outcome:** To develop a software platform for establishing marketplaces for local energy communities encompassing both sustainable renewable energy prosumers (ie producers-consumers) and people falling under the energy poverty criteria. With this platform, the producers of energy will not only trade energy generated from renewable sources to other community members, but declare energy surpluses  that are made available to people in need, i.e. those falling under the energy poverty criteria. 

The platform should integrate storage systems (e.g. batteries) as well as anticipate energy variations (surpluses, deficits) from changing weather conditions. Satellite data should be used to 1) to estimate the potential for renewable energy production (wind and solar energy) 2) to monitor and estimate variations from changing weather conditions affecting the renewable sources (e.g. solar photovoltaic, wind). Further all exchanges should be traceable and be registered with some form of electronic token. Blockchain and AI technology may be options for these solutions. 

*Further detailed specifications will be provided at the hackathon.

The prototype solutions to this challenge which fulfill the requirements will be taken forward to the European Commission JRC and evaluated soon after the hackathon ends. There is potential for hackathon teams to continue to further develop this prototype in agreement with the relevant stakeholders after the hackathon. 

**Datasets:** There are several spatial and satellite datasets that are openly available for use during the hackathon. Some have a global extent (i.e. wind speed, cloud cover from satellite imagery) others will only be available for specific regions (i.e. solar panels in Amsterdam). A repository with links for these datasets will be created. 

The European Commission JRC will provide:

Map of current private providers

Map of current storage systems

Market rules for energy transfer

Energy poverty criteria

**Technical details:** 

Programming language preference to modern open source and light packages like: Python, JavaScript, C#m PHP, Swift etc. and a simple graphical interface should be included.

The data should be recorded in a light time series database (Influx, Prometheus, SQL etc.) with a possibility to be queried and visualized (Grafana, Freeboard, Prometheus, Kibana etc.).

Some of the following standards, technologies and communication protocols should be considered: OSGP, TCP/IP, PLC, AMR, AMI, OpenADR, ANSI C12.18, Profinetm Modbus, Zigbee, Zwave, OPC, etc.

**Relevant links and resources:**

New Deal for Energy Consumers. European Commission. (2015): https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX:52015DC0339 

EU Energy Poverty Observatory (EPOV) European Commission. (2019): https://www.energypoverty.eu/

ENGAGER COST. (2019): http://www.engager-energy.net/ 

European Cooperation in Science and Technology. (2019): https://www.cost.eu/actions/CA16232/#tabs%7CName:overview 

## Deep Learning Resources
If you are developing a deep neural network based solution, you can use the free GPUs provided by either Google Colab or Kaggle. Here are the instructions for both:

### Google Colab:
Go to Google Colab and start a new notebook. You can use the instructions in this notebook to upload your datasets and work on them in Colab. When you need to use GPUs to train your models, switch GPU on under Edit --> Notebook settings. This notebook shows you an example of training a model built in TensorFlow using a GPU.

### Kaggle:
Go to Kaggle and create a user profile. Then, go to Kernels --> New Kernel. A blank notebook opens up, and you can write your code in here. You will see on the right side of the notebook an option to turn on the GPU. On the top right side of your notebook, you will see a symbol that looks like a cloud with an arrow on it. You can click on this to upload your data to Kaggle.

### Other options:
If you have a Google Cloud, or Amazon Web Services, or Paperspace account, etc, you can use one of these to train your models.
