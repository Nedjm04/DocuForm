# hakiwha1918
(Branch final is for back, VF is for the front)
# Générateur Intelligent de Documents de Formation

## Overview

A solution that automates the generation, distribution, and validation of training documents for professional training centers. From creating participant lists to generating QR-verified certificates and dashboards, our system makes training administration simple and efficient.

---

## Key Features

- **Admin Panel** to manage users, formations, and statistics
- **Trainee Portal** to access evaluations and download certificates
- **Dynamic PDF Generator** (attestations, convocations, presence sheets)
- **Dashboard** for global statistics and evaluation results
- **QR Code Verification** for documents
- **Modular Backend** (Laravel + MySQL)
- **Modern Frontend** (Next.js)

---

## Use Case

Built specifically for:
- Training institutions needing structured administrative tools
- Trainers looking for automated certificate and list generation
- Institutions aiming to reduce paper usage and human errors

---

## 🔧 Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Backend     | Laravel              |
| Frontend    | Next.js              |
| Database    | SQLight              |
| PDF Engine  | DOMPDF + QRLib       |
| Hosting     | Local/Remote Server  |

---

## Roles

- **Admin**
  - Manage formations and sessions
  - Generate documents (PDF)
  - Monitor evaluation feedback
- **Trainee**
  - Fill evaluation forms
  - Access training documents
  - Verify certificate via QR

---

## How to Run

1. **Clone repo**  
   ```bash
   git clone https://github.com/yourusername/gen-doc-formation.git
   cd gen-doc-formation
   ```
2. **Backend Setup**

    - Copy .env.example → .env and configure DB

    - Install dependencies

    ```bash
    composer install
    php artisan migrate --seed
    php artisan serve
    ```

3. **Frontend Setup**

    ```bash
    cd client
    npm install
    npm run dev
    ```


## Future Improvements
    - Multi-language support
    - AI assistant for document customization
    - Training recomendations based on the employee interest
    - Integration with national education platforms

