# Python Backend Instructions

## Local Setup

1.  **Navigate to the backend folder**:
    ```bash
    cd backend
    ```

2.  **Create a virtual environment (optional but recommended)**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the server**:
    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    The API will be available at `http://localhost:8000`.

5.  **Update Frontend**:
    Update your `.env` file in the root directory:
    ```
    EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:8000
    ```
    (Use your computer's local IP address if testing on a physical device, e.g., `192.168.1.X`).

## Railway Deployment

1.  **Push to GitHub**: Push your entire project to a GitHub repository.
2.  **Create Project on Railway**:
    *   Go to [Railway.app](https://railway.app).
    *   "New Project" > "Deploy from GitHub repo".
    *   Select your repository.
3.  **Add Database**:
    *   In your Railway project view, click "New" > "Database" > "PostgreSQL".
    *   Railway will automatically set the `DATABASE_URL` environment variable for your app.
4.  **Configure Root Directory**:
    *   Go to your App Service settings in Railway.
    *   Set **Root Directory** to `/backend`.
5.  **Get URL**:
    *   Go to "Settings" > "Networking" > "Generate Domain".
    *   Copy this URL (e.g., `https://web-production-xxxx.up.railway.app`).
6.  **Update Frontend**:
    *   Update `.env` with the new Railway URL:
    ```
    EXPO_PUBLIC_API_URL=https://your-app-url.up.railway.app
    ```
