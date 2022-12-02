import styles from './home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <main>
        <section className={styles.hero}>
          <div className={styles.leftConteiner}>
            <h2>Trackgenix</h2>
            <h3>Trackgenix</h3>
            <p>
              Trackgenix software provides businesses with a number of advantages and benefits. One
              of the most significant advantages of using Trackgenix is that it helps businesses to
              save time and increase productivity.
            </p>
            <p>
              By tracking employee time and project progress, businesses can identify areas where
              improvements can be made.
            </p>
            <button className={styles.learnMoreBtn}>Learn More</button>
          </div>
          <div className={styles.rightConteiner}>
            <button className={styles.learnMoreBtn}>Learn More</button>
          </div>
        </section>
        <section className={styles.services}>
          <div className={styles.column}>
            <div className={styles.divRotate45}>
              <span className={'material-symbols-outlined'}>info</span>
            </div>
            <div className={styles.serviceInfo}>
              <h2>Reports</h2>
              <p>
                Our solution has several reports that can be generated, including a report on the
                work hours of each employee in each project and work team. This report can be used
                to track employee productivity and to identify any areas where employees may be
                slacking off.
              </p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.divRotate45}>
              <span className={'material-symbols-outlined'}>alarm</span>
            </div>
            <div className={styles.serviceInfo}>
              <h2>Time tracking</h2>
              <p>
                Trackgenix has a time-tracking feature that allows employees to log their work hours
                for each project and work team. This feature is useful for businesses to track the
                work hours of their employees and to ensure that they are being used efficiently.
              </p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.divRotate45}>
              <span className={'material-symbols-outlined'}>groups</span>
            </div>
            <div className={styles.serviceInfo}>
              <h2>Resource managment</h2>
              <p>
                Our software has helped us to improve our resource management by allowing employees
                to log their work hours in a central location. This has made it easier for managers
                to track employee productivity and identify areas where improvements can be made.
              </p>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.divRotate45}>
              <span className={'material-symbols-outlined'}>sell</span>
            </div>
            <div className={styles.serviceInfo}>
              <h2>Multiple roles</h2>
              <p>
                The app will allow each employee to log in and select the project they are working
                on and the work team they are part of. They will then be able to select the hours
                they worked and submit them. The app will then calculate the total hours worked for
                each employee and project.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.why}>
          <h2>Why use Trackgenix?</h2>
          <ul className={styles.ulRow}>
            <li>
              <h3>Productivity booster</h3>
              <p>
                The strict way of working and performing the jobs allow a good insertion in the
                labor world.
              </p>
            </li>
            <li>
              <h3>Work traceability</h3>
              <p>These processes facilitate and improve the management of work.</p>
            </li>
            <li>
              <h3>Leadership and team management</h3>
              <p>
                Team Management is essential to establish a good quality of life at work and ensure
                good Project Management.
              </p>
            </li>
            <li>
              <h3>Decision making</h3>
              <p>
                Is the process by which a choice is made between alternatives or ways to solve
                different life situations.
              </p>
            </li>
          </ul>
        </section>
        <section className={styles.form}>
          <form id="landing-form" className={styles.landingForm}>
            <div className={styles.formRow}>
              <div className={styles.rowElement}>
                <label htmlFor="form-landing-name">Name</label>
                <input
                  type="text"
                  name="Name"
                  id="form-landing-name"
                  className={styles.formElement}
                ></input>
              </div>
              <div className={styles.rowElement}>
                <label htmlFor="form-landing-email">Email</label>
                <input
                  type="email"
                  name="Email"
                  id="form-landing-email"
                  className={styles.formElement}
                ></input>
              </div>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="form-landing-select">Contact Area:</label>
              <select name="Contact Area" id="form-landing-select" className={styles.formElement}>
                <option value="Options" hidden selected>
                  Options
                </option>
                <option value="System">System</option>
                <option value="Business">Business</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="form-landing-message">Message</label>
              <textarea
                name="Message"
                id="form-landing-message"
                cols="80"
                rows="7"
                className={styles.formElement}
                placeholder="Enter your message"
              ></textarea>
            </div>
            <input className={styles.formSendBtn} type="submit" value="Send"></input>
          </form>
        </section>
        <section className={styles.aboutUs}>
          <h2>ABOUT US</h2>
          <div className={styles.flexItem}>
            <div className={styles.aboutImg}></div>
            <p className={styles.aboutP}>
              Gigatech was founded in Silicon Valley in 2006. It is a privately held company that
              provides software development services to other businesses.
            </p>
          </div>
          <p className={styles.aboutP}>
            The companys primary focus is on providing high quality software development services.
            However, they also offer other services such as project management, consulting, and
            training.
          </p>
        </section>
        <section className={styles.final}>
          <div className={styles.column}>
            <h2>Products</h2>
            <ul>
              <li>
                <a href="#">Functionalities</a>
              </li>
              <li>
                <a href="#">Downloads</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
              <li>
                <a href="#">Extras</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>Company</h2>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Customers</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2>Support</h2>
            <ul>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
