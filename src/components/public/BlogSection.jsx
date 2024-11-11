// src/components/public/BlogSection.jsx
const BlogSection = () => {
    return (
      <div id="learn-more" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Latest Updates</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Advancing Research Through Technology
            </p>
          </div>
  
          <div className="mt-10">
            <div className="prose prose-blue prose-lg text-gray-500 mx-auto">
              <p className="text-xl">
                Our latest research demonstrates significant improvements in computational efficiency
                for molecular dynamics simulations. By leveraging advanced GPU architectures and
                optimized algorithms, we've achieved up to 3x speedup in typical workflows.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-8">Key Findings</h3>
              <ul className="mt-4">
                <li>Enhanced parallel processing capabilities</li>
                <li>Reduced memory overhead in large-scale simulations</li>
                <li>Improved accuracy in long-timescale predictions</li>
              </ul>
  
              <p className="mt-6">
                These improvements enable researchers to tackle larger systems and longer timescales,
                opening new possibilities in drug discovery and materials science.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogSection;