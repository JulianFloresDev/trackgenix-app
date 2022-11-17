import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div>
          <h3>Trackgenix</h3>
          <div>
            <div>
              <h4>Products</h4>
              <ol>
                <li>1. Functionalities</li>
                <li>2. Downloads</li>
                <li>3. Integrations</li>
                <li>4. Aditional features</li>
              </ol>
            </div>
            <div>
              <h4>Business</h4>
              <ol>
                <li>1. About us</li>
                <li>2. Costumers</li>
                <li>3. Resources</li>
                <li>4. Blog</li>
              </ol>
            </div>
            <div>
              <h4>Support</h4>
              <ol>
                <li>1. Help</li>
                <li>2. Tutorial</li>
                <li>3. Api</li>
                <li>4. Contact</li>
              </ol>
            </div>
          </div>
        </div>
        <div>
          <p>&copy; 2022, trackgenix</p>
          <div>
            <img src={`${process.env.PUBLIC_URL}/assets/images/tw.svg`} />
            <img src={`${process.env.PUBLIC_URL}/assets/images/ig.svg`} />
            <img src={`${process.env.PUBLIC_URL}/assets/images/fb.svg`} />
            <img src={`${process.env.PUBLIC_URL}/assets/images/in.svg`} />
            <img src={`${process.env.PUBLIC_URL}/assets/images/gh.svg`} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
