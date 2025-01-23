# Technical Challenge - Codental Developer

This project implements a management and display system for clients and appointments data.

## 🚀 Technologies Used

- **Backend:** [Node.js](https://nodejs.org) with [Express](https://expressjs.com)
- **Frontend:** [React.js](https://reactjs.org) with [Next.js](https://nextjs.org)
- **Database:** [PostgreSQL](https://www.postgresql.org)
- **Authentication:** [JWT](https://jwt.io)
- **Component Library:** [Material-UI](https://mui.com)
- **Real-Time Updates:** [Socket.IO](https://socket.io)
- **Background Processing:** [BullMQ](https://docs.bullmq.io) with [Redis](https://redis.io)
- **Containers:** [Docker](https://www.docker.com) with [Docker Compose](https://docs.docker.com/compose/)

---

## 📖 Features

### 🛠 Administrative Section (Dashboard)

#### **Dashboard Access**

- Authentication via email and password secured with JWT.

#### **CSV Import**

- Upload `clientes.csv` files with data normalization:
  - Capitalized names.
  - Addresses split into separate fields.
  - Phone numbers formatted as `(XX) XXXX-XXXX` or `(XX) XXXXX-XXXX`.
  - CPF numbers formatted as `XXX.XXX.XXX-XX`.
  - Prevents duplicate CPF entries in the database.
- **Asynchronous Processing:**
  - CSV file processing uses BullMQ and Redis for job queues, enabling scalability and improved performance.

#### **Manual Entry Form**

- Allows manual client registration.
- Validations:
  - Mandatory fields: Name, Address, City, State, ZIP, Phone, and CPF.
  - Prevents duplicate CPF entries.

#### **Client Listing**

- Table with search, pagination, and sorting.
  - Search by CPF, Name, or Phone.
  - Sort by Name, State, or Registration Date.

#### **Appointments**

- Register appointments with Name, Start Date, and End Date.
  - Validates schedule conflicts.
  - Appointments table with full listing.

---

### 🌐 External Section (Public)

#### **Dynamic Display**

- Total number of registered clients.
- Number of clients with duplicate phone numbers.
- Number of clients by state.
- Real-time updates via WebSocket.

---

## 📦 How to Run the Project Locally

### Using Docker Compose

1. Clone the repository:

   ```bash
   git clone https://github.com/ConstantinoRafael/dt-codental.git
   cd dt-codental
   ```

2. Configure the environment variables:

   - In the `backend` directory, create the `.env` file based on `.env.example`;
   - In the `frontend` directory, create the `.env` file based on `.env.example` (and based on the `backend` `.env`).

3. Run Docker Compose:

   ```bash
   docker compose up -d --build
   ```

4. Access the system:

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

### Running Manually

1. Install dependencies:

   ```bash
   #backend
   cd backend
   npm install

   #frontend
   cd ../frontend
   npm install
   ```

2. Create a PostgreSQL database with any name.

3. Configure the environment variables:

   - In the `backend` directory, create the `.env` file based on `.env.example`;
   - In the `frontend` directory, create the `.env` file based on `.env.example` (and based on the `backend` `.env`).

4. Ensure Redis is running:

   - Run a Redis container with the command:
     ```bash
     docker run -d --name redis -p 6379:6379 redis
     ```
   - Or start Redis service locally, if already installed.

5. Create the database tables:

   ```bash
   cd ../backend
   npm run init-db
   ```

   (this script will also create the user to access the administrative section of the application)

6. Start the project:

   ```bash
   #backend
   cd ../backend
   npm run dev

   #frontend
   cd ../frontend
   npm run dev
   ```

---

## 🌍 Accessing the System in Production

Access: https://dt-codental.vercel.app/

- login: admin@codental.com
- password: admin123

---
