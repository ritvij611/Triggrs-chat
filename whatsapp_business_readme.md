# WhatsApp Business Management Platform

A comprehensive WhatsApp Business API management platform built with Next.js that enables businesses to manage customer communications, broadcast campaigns, and handle multiple WhatsApp Business accounts from a unified dashboard.

## 🚀 Features

### Core Communication Features
- **Unified WhatsApp Business Account Management**: Handle customer chats via a unified WhatsApp Business account that can be accessed simultaneously from 1000+ devices
- **Real-time Messaging**: Instant messaging capabilities with real-time updates
- **Message Broadcasting**: Send bulk messages to multiple contacts
- **Message Tracking**: Track message status (sent, delivered, read, failed)
- **Resumable File Uploads**: Handle large file transfers with resume capability

### Customer & Contact Management
- **Customer Contacts Management**: Create and manage comprehensive customer contact lists
- **Centralized Inbox**: Receive and manage all customer messages in one unified inbox
- **Auditable Conversations**: Maintain centralized, auditable conversation history

### Campaign & Template System
- **Message Templates**: Create reusable message templates for consistent communication
- **Campaign Management**: Create and manage marketing campaigns
- **Campaign Analytics**: View detailed statistics including delivery rates, read rates, and failure analytics
- **Template Broadcasting**: Send templated messages to contact lists

### Multi-Company Support
- **Multi-Company Management**: One user can be part of multiple companies and handle their respective WhatsApp Business accounts
- **Company Creation**: Create new companies to handle separate WhatsApp Business accounts

### Advanced Messaging Features
- **Customer Service Window**: Converse with customers and send images/documents within the 24-hour customer service window
- **Marketing Messages**: Send marketing messages outside the customer service window and renew the 24-hour window
- **Rich Media Support**: Send images, documents, and other media files
- **Message Status Tracking**: Real-time tracking of message delivery status

### Team Collaboration
- **Team Collaboration Tools**: Enable multiple team members to work together
- **Streamlined Outreach**: Organized approach to customer communication
- **Role-based Access**: Manage team permissions and access levels

## 🛠 Technology Stack

- **Frontend**: Next.js (React-based framework)
- **Backend**: AWS Lambda functions
- **API Integration**: WhatsApp Business API via Facebook Business Platform
- **Architecture**: Serverless architecture with API Gateway
- **Font Optimization**: Next.js Font optimization with Geist font family

## 🏗 Architecture

This project uses a hybrid architecture:
- **Frontend**: Next.js application with pages/api functions serving as wrapper functions
- **Backend**: Core business logic implemented as AWS Lambda functions
- **Integration**: Facebook Business App with verified credentials for WhatsApp Business API access

## 📋 Prerequisites

Before running this project, ensure you have:
- Node.js (version 14 or higher)
- npm, yarn, pnpm, or bun package manager
- Access to environment credentials (contact the project owner)
- Facebook Business App credentials (for WhatsApp Business API)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd whatsapp-business-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Environment Setup** (Important):
   - Contact the project owner for environment credentials
   - The backend AWS Lambda functions require specific credentials
   - Facebook Business App credentials are needed for WhatsApp API integration

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### API Routes

The application uses Next.js API routes as wrapper functions:
- API routes are accessible at `http://localhost:3000/api/*`
- Routes in `pages/api` directory serve as proxies to AWS Lambda functions
- Example: `http://localhost:3000/api/hello` (editable in `pages/api/hello.js`)

## 🔧 Configuration

### Environment Variables

The project requires specific environment variables for:
- AWS Lambda function endpoints
- Facebook Business App credentials
- WhatsApp Business API configuration
- Database connection strings

**Note**: Environment credentials are proprietary and must be obtained from the project owner.

### Facebook Business Integration

This project uses a Tech Provider account on Facebook with:
- Verified Business App
- WhatsApp Business API access
- Shared credentials between AWS and frontend environments

## 📱 Usage

### Dashboard Navigation
- **Dashboard**: Overview of all activities and statistics
- **Contacts**: Manage customer contact lists
- **Templates**: Create and manage message templates
- **Campaigns**: Create, manage, and track marketing campaigns
- **Inbox**: Handle incoming customer messages
- **Agents**: Manage team members and permissions

### Creating a Campaign
1. Navigate to Templates and create message templates
2. Go to Campaigns and create a new campaign
3. Select contacts and templates
4. Launch campaign and monitor statistics

### Managing Conversations
1. Access the Inbox to view customer messages
2. Respond within the 24-hour service window for free messaging
3. Use marketing templates for messages outside the service window

## 🚀 Deployment

### Vercel Deployment (Recommended)

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

For detailed deployment instructions, see [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

### Environment Setup for Deployment
- Ensure all AWS Lambda endpoints are accessible
- Configure Facebook Business App credentials
- Set up proper CORS policies for API access

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn-pages-router) - Interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js) - Contribute and provide feedback

### WhatsApp Business API
- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Facebook Business Platform](https://business.facebook.com/)


## 📞 Support

For environment credentials, AWS Lambda access, or technical support, please contact the project owner.

## ⚠️ Important Notes

- **Backend Dependencies**: The core functionality relies on AWS Lambda functions that are not included in this repository
- **Credentials Required**: Environment credentials must be obtained from the project owner
- **Facebook Integration**: Requires verified Facebook Business App credentials
