FROM node:16.16.0-alpine AS uibuild
RUN apk add --no-cache make rsync
RUN mkdir frontendbuild
WORKDIR /frontendbuild
COPY Makefile ./
COPY frontend/ ./frontend
COPY setup.py ./
COPY gpt_code_ui/webapp/static ./gpt_code_ui/webapp/static
RUN ls -al .
RUN make compile_frontend


FROM python:3.10-slim as backendbuild
RUN mkdir backendbuild
WORKDIR /backendbuild
RUN pip install --upgrade pip setuptools
RUN pip install "ipykernel>=6,<7" "numpy>=1.24,<1.25" "dateparser>=1.1,<1.2" "pandas>=1.5,<1.6" "geopandas>=0.13,<0.14" "tabulate>=0.9.0<1.0" "PyPDF2>=3.0,<3.1" "pdfminer>=20191125,<20191200" "pdfplumber>=0.9,<0.10" "matplotlib>=3.7,<3.8" "openpyxl>=3.1.2,<4"
COPY gpt_code_ui/ ./gpt_code_ui
COPY setup.py ./
COPY README.md ./
RUN pip install -e .

# Inject frontend into backend resources to be served from there
COPY --from=uibuild /frontendbuild/frontend/dist/ ./gpt_code_ui/webapp/static

COPY run_with_app_service_config.py ./

RUN ls -al .
RUN ls -al ./gpt_code_ui
RUN which python
RUN cat run_with_app_service_config.py

EXPOSE 8080

CMD ["python", "./run_with_app_service_config.py", "./gpt_code_ui/main.py"]
