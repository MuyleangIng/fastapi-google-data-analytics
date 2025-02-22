# FastAPI Project Setup Guide

## Setting Up a Virtual Environment

### Windows
```bash
python -m venv venv
```

### Mac/Linux
```bash
python -m venv venv
```

## Activating the Virtual Environment

### Windows
```bash
venv\Scripts\activate
```

### Mac/Linux
```bash
source venv/bin/activate
```

## Installing Dependencies
```bash
pip install -r requirements.txt
```

## Running the FastAPI Application
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

