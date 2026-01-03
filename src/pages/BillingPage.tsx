import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BillingPortal from '../components/BillingPortal';
import SocialFooter from '../components/SocialFooter';

export default function BillingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-24">
        <BillingPortal />
      </div>
      <SocialFooter />
    </div>
  );
}
