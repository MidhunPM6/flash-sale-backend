# Flash sale backend Microservices Assessment

This repository contains the partial implementation of an **Flash sale** as part of the assessment.  

Currently implemented services:

1. **Authentication Service**  
2. **Catalog & Inventory Service**

---

## Completed Services

### 1. Authentication Service
Handles user authentication and authorization.

**Features implemented:**
- User registration and login endpoints
- JWT access and refresh token issuance
- Token refresh endpoint and logout
- Access token required for all protected APIs

### 2. Catalog & Inventory Service
Manages products and stock levels.

**Features implemented:**
- Product management: list and add products
- Stock management: update stock levels
- Stock reservation API with concurrency safety (prevents overselling)
- Emits stock reservation result events to Kafka

---

## Pending Services (Not yet implemented)
- **Order Service**: order creation, idempotency, outbox pattern, Kafka events, inventory result consumption  
- **Notifier Service (WebSockets)**: real-time order updates via Kafka and JWT-authenticated WebSockets  
- **API Gateway**: JWT verification, rate limiting (Redis), routing to services  

---

