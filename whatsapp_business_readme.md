# WhatsApp Business Communication Platform

**Effortless Communication. Enhanced Engagement.**

A comprehensive WhatsApp Business solution that revolutionizes business communication through seamless messaging, enhanced customer engagement, and unmatched growth opportunities.

![Platform Overview](https://img.shields.io/badge/Platform-WhatsApp%20Business-25D366?style=for-the-badge&logo=whatsapp)
![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=for-the-badge&logo=next.js)
![AWS Lambda](https://img.shields.io/badge/Backend-AWS%20Lambda-FF9900?style=for-the-badge&logo=amazon-aws)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

## 🚀 Overview

This platform enables businesses to manage customer communications through a unified WhatsApp Business account, supporting multi-device access, team collaboration, and comprehensive message management. Built with the official WhatsApp Business API, it provides enterprise-grade features for businesses of all sizes.

## 🏗️ Architecture

The platform follows a serverless architecture:
- **Frontend**: Next.js application with API routes serving as wrapper functions
- **Backend**: AWS Lambda functions handling core business logic
- **API Layer**: Next.js API routes (`pages/api`) act as middleware, forwarding frontend requests to AWS Lambda functions
- **Integration**: Official WhatsApp Business API through Meta Business App credentials

## ✨ Key Features

### 📱 Multi-Device Management
- **Unified WhatsApp Business Account**: Manage customer chats from a single business account
- **1000+ Device Support**: Access your business account simultaneously across multiple devices
- **Real-time Synchronization**: All conversations and data sync across all connected devices

### 💬 Advanced Messaging
- **Real-time Messaging**: Instant communication with customers
- **Message Broadcasting**: Send campaigns to multiple contacts simultaneously
- **Message Tracking**: Monitor sent, delivered, read, and failed message statuses
- **Resumable File Uploads**: Share images, documents, and media files seamlessly
- **Template Management**: Create and manage reusable message templates for campaigns

### 👥 Team Collaboration
- **Multi-Company Support**: One user can manage multiple company WhatsApp accounts
- **Centralized Conversations**: Maintain auditable conversation history
- **Streamlined Outreach**: Coordinate team efforts for customer communication
- **Agent Management**: Assign and manage team members across different companies

### 📊 Contact & Campaign Management
- **Contact Management**: Create and maintain organized customer contact lists
- **Campaign Creation**: Design and execute targeted marketing campaigns
- **Campaign Analytics**: Track campaign performance with detailed statistics
- **Delivery Insights**: Monitor message delivery rates and engagement metrics

### 🕐 Smart Messaging Windows
- **Customer Service Window**: Full conversation capabilities within 24 hours of last customer message
- **Marketing Messages**: Send promotional content outside the service window
- **Window Renewal**: Automatically renew 24-hour service windows with marketing messages
- **Compliance Management**: Ensure adherence to WhatsApp Business policies

### 📈 Analytics & Reporting
- **Message Statistics**: Comprehensive tracking of sent, delivered, and read messages
- **Campaign Performance**: Detailed analytics on broadcast campaign effectiveness
- **Contact Engagement**: Monitor customer interaction patterns
- **Failure Analysis**: Track and resolve message delivery issues

## 🛠️ Technology Stack

- **Frontend**: Next.js with React
- **API Layer**: Next.js API routes (wrapper functions)
- **Backend**: AWS Lambda functions (serverless)
- **API Integration**: Official WhatsApp Business API via Meta Business App
- **Real-time Updates**: WebSocket connections for instant messaging
- **File Management**: Secure document and media handling
- **Authentication**: Multi-tenant user management system

## 📋 Getting Started

### Prerequisites

#### Meta Business App Requirements
**⚠️ CRITICAL**: You need your own Meta Business App credentials to run this project. The platform requires:

- **Meta Business Manager Account**: Verified business account
- **Meta App ID**: From your Meta Business App
- **Meta App Secret**: Secret key for your Meta Business App
- **Meta Business Config ID**: Configuration ID for WhatsApp Business API
- **WhatsApp Business Account**: Linked to your Meta Business App

#### Development Environment
- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun
- AWS Account (for Lambda functions)
- AWS CLI configured with appropriate permissions

### Meta Business App Setup

1. **Create Meta Business Manager Account**:
   - Go to [Meta Business Manager](https://business.facebook.com)
   - Create and verify your business account

2. **Create Meta App**:
   - Visit [Meta for Developers](https://developers.facebook.com)
   - Create a new app and select "Business" type
   - Add WhatsApp Business API product to your app

3. **Configure WhatsApp Business API**:
   - Set up webhook URLs for your Lambda functions
   - Configure phone number for WhatsApp Business
   - Get verification and approval for business use

4. **Obtain Credentials**:
   - App ID from App Dashboard
   - App Secret from App Settings > Basic
   - Business Config ID from WhatsApp > Configuration

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whatsapp-business-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Frontend Environment Setup**
   Create a `.env.local` file for Next.js frontend:
   ```env
   SESS_SECRET_TOKEN=your_auth_secret
   NEXT_PUBLIC_FB_APP_ID=your_meta_business_app_id
   NEXT_PUBLIC_FB_APP_SECRET=your_meta_business_app_secret
   NEXT_PUBLIC_FB_CONFIG_ID=your_meta_business_config_id
   STAGE=production_stage_of_product
   AWS_LAMBDA_ENDPOINT=your_aws_lambda_api_gateway_url
   ```

4. **AWS Lambda Environment Setup**
   Configure the following environment variables in your AWS Lambda functions:
   ```env
   FB_APP_ID=your_meta_business_app_id
   FB_APP_SECRET=your_meta_business_app_secret
   FB_CONFIG_ID=your_meta_business_config_id
   WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
   WHATSAPP_BUSINESS_ACCOUNT_ID=your_whatsapp_business_account_id
   VERIFY_TOKEN=your_webhook_verify_token
   ```

5. **Deploy AWS Lambda Functions**
   - Deploy your Lambda functions using AWS CLI, SAM, or Serverless Framework
   - Ensure API Gateway is configured to route requests to appropriate Lambda functions
   - Update the `AWS_LAMBDA_ENDPOINT` in your frontend environment

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

7. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Core Functionality

### Dashboard
- Overview of all active conversations
- Quick access to contacts, templates, and campaigns
- Real-time notification system
- Performance metrics and analytics

### Contact Management
- Import and organize customer contacts
- Segment contacts for targeted campaigns
- Track customer interaction history
- Manage opt-in/opt-out preferences

### Template System
- Create reusable message templates
- Support for text, media, and interactive templates
- Template approval and compliance management
- Multi-language template support

### Campaign Management
- Design broadcast campaigns with templates
- Schedule campaigns for optimal delivery
- Monitor campaign performance in real-time
- A/B test different message variations

### Conversation Inbox
- Unified inbox for all customer conversations
- Rich media support (images, documents, audio)
- Quick reply templates and shortcuts
- Conversation assignment and routing

## 📱 User Interface

The platform features a clean, intuitive interface with:
- **Desktop-Optimized Design**: Currently tailored for desktop use only (not responsive)
- **Familiar Inbox UI**: The inbox interface closely resembles the WhatsApp layout for familiarity and ease of use
- **Accessible Navigation**: Easy-to-use menu system
- **Real-time Updates**: Live conversation and notification updates
- **Organized Data Views**: Contacts, templates, and campaign data are displayed in clear, structured tables
- **Data Visualization**: Key statistics and metrics are presented using interactive graphs and charts for easy interpretation and decision-making

## 🔧 AWS Lambda Functions

The backend is powered by AWS Lambda functions that handle:

### Core API Functions
- **Message Handler**: Processes sending and receiving messages
- **Contact Manager**: Manages contact operations (CRUD)
- **Campaign Engine**: Handles broadcast campaigns and scheduling
- **Template Manager**: Manages message templates and approvals
- **Analytics Processor**: Generates reports and statistics
- **Webhook Handler**: Processes WhatsApp webhook events

### API Gateway Integration
- RESTful API endpoints routing to Lambda functions
- Authentication and authorization middleware
- Rate limiting and request validation
- CORS configuration for frontend requests

## 🚀 Deployment

### Frontend Deployment (Vercel - Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Backend Deployment (AWS Lambda)
1. **Using AWS SAM**:
   ```bash
   sam build
   sam deploy --guided
   ```

2. **Using Serverless Framework**:
   ```bash
   serverless deploy
   ```

3. **Using AWS CLI**:
   ```bash
   aws lambda create-function --function-name your-function-name
   ```

### Environment Configuration
Ensure all Meta Business App credentials are properly configured in:
- AWS Lambda environment variables (for backend functions)
- Vercel environment variables (for frontend)
- Local `.env.local` file (for development)

## 📖 API Documentation

### Frontend API Routes (Wrapper Functions)
These Next.js API routes forward requests to AWS Lambda:
- `POST /api/messages/send` - Forwards to Lambda message handler
- `POST /api/campaigns/broadcast` - Forwards to Lambda campaign engine
- `GET /api/contacts` - Forwards to Lambda contact manager
- `POST /api/templates/create` - Forwards to Lambda template manager
- `GET /api/analytics/campaign/:id` - Forwards to Lambda analytics processor

### AWS Lambda Endpoints
Core business logic handled by Lambda functions:
- Message processing and WhatsApp API integration
- Contact management and database operations
- Campaign execution and scheduling
- Template management and Meta approval workflow
- Real-time analytics and reporting

### Webhook Integration
AWS Lambda functions handle WhatsApp webhooks for:
- Message delivery status updates
- Incoming customer messages
- Template approval notifications
- Account status changes

## ⚠️ Important Notes for Third-Party Setup

### Meta Business App Credentials
**You MUST have your own Meta Business App credentials**. This project cannot work with:
- Shared or borrowed credentials
- Demo or test credentials from the original developer
- Incomplete Meta Business App setup

### Required Permissions
Your Meta Business App must have:
- WhatsApp Business Management permission
- WhatsApp Business Messaging permission
- Business Manager access to WhatsApp Business Account
- Webhook configuration permissions

### Compliance Requirements
- Business verification with Meta
- WhatsApp Business API approval
- Adherence to WhatsApp Business Policy
- Valid business use case documentation

## 🔐 Security & Compliance

- **WhatsApp Business Policy Compliance**: Full adherence to platform guidelines
- **AWS Security**: Lambda functions with proper IAM roles and permissions
- **Environment Variable Security**: Sensitive credentials stored securely in AWS and Vercel
- **User Authentication**: Secure login and session management
- **Audit Trails**: Complete logging of all user actions and message history

## 🤝 Contributing

We welcome contributions to improve the platform:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- 📧 Email: support@yourplatform.com
- 📚 Documentation: [Link to detailed docs]
- 🐛 Bug Reports: [GitHub Issues]
- 💬 Community: [Discord/Slack channel]

**Note**: Support does not include assistance with obtaining Meta Business App credentials. Users must set up their own Meta Business Manager account and app.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- WhatsApp Business API team for providing the official API
- Next.js community for the excellent framework
- AWS Lambda for serverless backend infrastructure
- All contributors who help improve this platform

---

**Built with ❤️ for businesses who value seamless customer communication**

**⚠️ Disclaimer**: This project requires your own Meta Business App credentials and AWS account. The original developer's credentials are not included and cannot be shared.