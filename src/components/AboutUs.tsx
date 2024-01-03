import { Link } from 'react-router-dom';

const AboutUs= () => {
  return (
    <section className="py-3 py-md-5 py-xl-8">
       <div className="overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 col-lg-8">
            <h3 className="fs-5 mb-2 text-secondary text-uppercase">About</h3>
            <h2 className="display-5 fs-5 mb-2 text-secondary ">Thay Technologies is an IT Solutions firm based in Chennai. With its state-of-the-art infrastructure and amicable location in the heart of the city, Thay Technologies intends to add value to IT companies.</h2>
            <Link to="/learnMore">
            <button type="button" className="btn btn-lg btn-primary mb-3 mb-md-4 mb-xl-5">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      </div>
      <div className="container">
        <div className="row gy-3 gy-md-4 gy-lg-0">
          <div className="col-12 col-lg-6">
            <div className="card bg-light p-3 m-0">
              <div className="row gy-3 gy-md-0 align-items-md-center">
                <div className="col-md-5">
                <img src="src/components/images/about-img-2.jpg" alt="" className="img-fluid img-thumbnail"/>
                  {/* Add content for the left side of the first card if needed */}
                </div>
                <div className="col-md-7">
                  <div className="card-body p-0">
                    <h2 className="card-title h4 mb-3">Why Choose Us?</h2>
                    <p className="card-text lead"> Thay Technologies intends to add value to IT companies. Thay Technology rings a fresh and innovative approach to IT services, acting as liaison between the client and their end-users.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="card bg-light p-3 m-0">
              <div className="row gy-3 gy-md-0 align-items-md-center">
                <div className="col-md-5">
                <img src="src/components/images/about-img-1.jpg" alt="" className="img-fluid rounded-start"/>
                  {/* Add content for the left side of the second card if needed */}
                </div>
                <div className="col-md-7">
                  <div className="card-body p-0">
                    <h2 className="card-title h4 mb-3">Our Employee</h2>
                    <p className="card-text lead">Our Employees are highly qualified professionals in their respective areas. Their technical expertise and hands-on-experience make our firm stand out of the crowd. Not only do our employees enjoy the freedom and comforts of the best-in-class work environment, but also are treated with respect.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  );
};

export default AboutUs;
