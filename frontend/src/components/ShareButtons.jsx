export default function ShareButtons({ text }) {
  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="share-buttons">
      <button className="share-btn share-whatsapp" onClick={shareOnWhatsApp}>
        WhatsApp
      </button>
      <button className="share-btn share-twitter" onClick={shareOnTwitter}>
        X / Twitter
      </button>
    </div>
  );
}
