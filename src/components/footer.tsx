'use client'


const Footer = () => {
    return (
        <div className="footer">
            <h1>
                hello@functionaldesign.studio
            </h1>
            <div className="contact_via">
                <p>Contact via Messenger:</p>
                <div className="contact_via_icon">
                    <img src="/whatsapp_all.svg" alt="" />
                    <span>WhatsApp</span>
                </div>
                <div className="contact_via_icon">
                    <img src="/telegram_all.svg" alt="" />
                    <span>Telegram</span>
                </div>
            </div>
            <div className="footer_form">
                <h1>Order <br /> a service</h1>
                <form className="Fform">
                    <input required type="text" placeholder="Name"/>
                    <input required type="tel" placeholder="Phone"/>
                    <input required type="email" placeholder="Email"/>
                    <div className="footer_buttons">
                        <button>Send</button>
                        <p>By clicking on the «Send» button, I consent to the processing of personal data</p>
                    </div>
                </form>
            </div>
            <div className="discover">
                <div className="links">
                    <p>Get in touch with me through:</p>
                    <img src="/whatsapp.svg" alt="" />
                    <img src="/telegram.svg" alt="" />
                    <img src="/linkedin.svg" alt="" />
                </div>
                <p>© Functional Design Studio. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer