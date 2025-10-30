FROM python:3.10-alpine

# Setting working directory
WORKDIR /app

#adding directory
ADD . .

# Install Python dependencies
RUN pip install -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]
