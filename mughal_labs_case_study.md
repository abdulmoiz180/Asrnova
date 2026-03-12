# Mughal Labs — Mobile App Case Study

---

## Client Overview

**Mughal Labs** is a leading diagnostic and pathology laboratory based in Lahore, Pakistan. With multiple lab branches and pharmacy locations across the city, they serve thousands of patients and consulting physicians daily. Their mission is to provide accessible, accurate, and timely diagnostic services.

---

## The Challenge

Mughal Labs needed a **cross-platform mobile application** (iOS & Android) to digitize their patient experience and streamline operations. Before the app, patients had to physically visit lab branches to collect test reports, check pricing, or request home sampling — leading to long wait times, inconvenience, and operational bottlenecks. Consultants (referring physicians) also lacked a dedicated digital interface to track and retrieve patient reports remotely.

### Key Problems to Solve
- Patients had no digital access to their lab test reports
- Consultants could not remotely look up patient results
- No online test pricing transparency for patients
- Home sample collection was managed manually via phone calls
- Lab and pharmacy branch locations were not easily discoverable

---

## Our Solution

We designed and developed **Nexus — Mughal Labs**, a fully native React Native mobile application that serves as a unified digital gateway for patients, consultants, and the organization. The app bridges the gap between Mughal Labs' backend laboratory information system (LIS) and its end users through a clean, intuitive mobile experience.

---

## Key Features

### 🔬 Digital Report Access
Patients can securely log in using their **Patient Number & Case Number** or scan a **QR code** on their lab receipt to instantly view and download their test reports as PDFs — no need to visit the lab in person. Reports display real-time status tracking: **Registered → Test In Process → Approved → Delivered**.

### 👨‍⚕️ Consultant Portal
Referring physicians get a dedicated login to search and retrieve patient reports by date range, patient number, or phone number. This allows doctors to review results remotely, improving diagnosis turnaround time.

### 💰 Test Rate Calculator
An interactive tool that lets patients search for any test by name or code and calculate total costs. The calculator supports **three pricing tiers**: Standard Rate, Zakat Rate, and Welfare Rate — reflecting Mughal Labs' commitment to affordable diagnostics for underprivileged communities.

### 📍 Lab & Pharmacy Locator
A GPS-powered **interactive map** (Google Maps integration) that shows all Mughal Labs branches and partner pharmacies. The app automatically detects the user's location, calculates distance to the nearest branch, sorts locations by proximity, and provides **one-tap navigation directions**. Users can toggle between map view and list view. Each location displays address, phone number, and click-to-call functionality.

### 🏠 Home Sample Collection
Patients can book a home sample collection directly from the app. The form collects patient details (name, phone, address, test instructions) and sends the request via **WhatsApp integration** — enabling instant communication with the lab's collection team. A dedicated floating WhatsApp button provides quick-access booking.

### 🔐 Secure Authentication
The app implements a multi-layered authentication system:
- **Patient login** via Patient Number + Case Number (quick access) or Email + Password
- **Consultant login** with username + password
- **Multi-Factor Authentication (MFA)** with OTP verification
- **Biometric login** (Fingerprint/Touch ID) for returning users
- **QR Code scanning** for instant report access
- Session management with secure token storage via AsyncStorage

### 🤲 Donation Module
A built-in donation form enables supporters to contribute to Mughal Labs' welfare initiatives. Donors can choose from three collection methods: **Mail/Courier, Bank Cheque, or Door-Step Pickup** — reinforcing the lab's social impact mission.

### 👤 User Profile Management
Registered patients can view and manage their profile information, including personal details and account settings.

### ℹ️ About Us & Contact Us
Dedicated informational screens about Mughal Labs, along with contact details and direct social media links to their **Website, LinkedIn, Facebook, Instagram, and YouTube** channels.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React Native 0.72 |
| **Language** | JavaScript / JSX |
| **State Management** | Redux + Redux Toolkit + Redux Thunk |
| **Navigation** | React Navigation 6 (Native Stack) |
| **UI Components** | NativeBase, FontAwesome Icons, Vector Icons |
| **Maps** | React Native Maps + Geolib (distance & proximity) |
| **Camera / QR** | React Native Camera |
| **Authentication** | Custom API Auth + AsyncStorage + Biometrics |
| **PDF Viewing** | React Native PDF + WebView |
| **Backend API** | RESTful API (Nexus Pro) |
| **Platforms** | iOS & Android |

---

## Results & Impact

- ✅ **Eliminated in-person visits** for report collection — patients access results digitally 24/7
- ✅ **Reduced consultant turnaround** — doctors retrieve patient data remotely in seconds
- ✅ **Pricing transparency** — patients compare rates across Standard, Zakat & Welfare tiers before visiting
- ✅ **Streamlined home sampling** — WhatsApp-powered booking replaced manual phone-call coordination
- ✅ **Branch discoverability** — GPS locator drives walk-in traffic to the nearest lab or pharmacy
- ✅ **Security-first design** — MFA and biometric login protect sensitive medical data
- ✅ **Social welfare support** — in-app donation module connects Mughal Labs with community donors

---

## Platforms

📱 **iOS** &nbsp;&nbsp; | &nbsp;&nbsp; 📱 **Android**

---

> *Built with precision for the healthcare industry — combining secure data access, location intelligence, and seamless patient communication into one unified mobile experience.*
