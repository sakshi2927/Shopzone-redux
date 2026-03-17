function ContactPage() {
  return (
    <section className="panel page-card">
      <h2>Contact Us</h2>
      <form className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" placeholder="Your full name" />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="How can we help?" />
        </div>

        <button type="button" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default ContactPage;
