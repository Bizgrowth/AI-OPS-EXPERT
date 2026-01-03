import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SubscriptionPlans from '../components/SubscriptionPlans';
import SocialFooter from '../components/SocialFooter';

export default function SubscriptionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-24">
        <SubscriptionPlans />
      </div>
      <SocialFooter />
    </div>
  );
}
