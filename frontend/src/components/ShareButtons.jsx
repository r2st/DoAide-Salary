import { shareOnWhatsApp, shareOnTwitter } from '../api';

export default function ShareButtons({ text }) {
  return (
    <div className="share-buttons">
      <button className="share-btn share-whatsapp" onClick={() => shareOnWhatsApp(text)}>
        WhatsApp
      </button>
      <button className="share-btn share-twitter" onClick={() => shareOnTwitter(text)}>
        Twitter
      </button>
    </div>
  );
}
