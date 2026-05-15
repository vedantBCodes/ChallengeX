# ChallengeX Deployment

## Backend

Deploy the `Backend` folder as a Node.js web service.

Recommended settings:

- Root directory: `Backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/`

Required environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=4001
UPI_VALIDATE_ON_SIGNUP=false
```

Optional Razorpay UPI validation variables:

```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_VALIDATE_VPA_URL=https://api.razorpay.com/v1/payments/validate/vpa
```

After deployment, open the backend URL. It should return:

```json
{
  "success": true,
  "message": "ChallengeX API is running"
}
```

## Frontend

Deploy the `Frontend` folder as a Vite React static site.

Recommended settings:

- Root directory: `Frontend`
- Build command: `npm install && npm run build`
- Output directory: `dist`

Required environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.example.com
```

Replace the value with the deployed backend URL, without a trailing slash.
