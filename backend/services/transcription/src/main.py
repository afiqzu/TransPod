import os
import time

import uvicorn
from dotenv import load_dotenv

from controller.controllers import app
from init_db import DB

if __name__ == "__main__":
    load_dotenv()

    # wait for DB to spin up
    time.sleep(10)
    DB.init()

    # Must change host to "0.0.0.0" when trying to access the server in a container
    # https://stackoverflow.com/questions/75308496/how-do-i-run-uvicorn-in-a-docker-container-that-exposes-the-port
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("FAST_API_PORT")), log_level="debug")
