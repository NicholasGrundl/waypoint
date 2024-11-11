// src/components/public/PublicView.jsx
import HeroCard from './HeroCard';
import BlogSection from './BlogSection';

const PublicView = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroCard />
      <BlogSection />
    </div>
  );
};

export default PublicView;