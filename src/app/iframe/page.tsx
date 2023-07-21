const IframeTest = () => {
  return (
    <div>
      <h1>Iframe test</h1>
      <p>This is a test that Google can render and index the iframe</p>
      <iframe
        src="https://fingerprinthub.com/coupon-fraud/embed"
        width="800"
        height="900"
        style={{ borderWidth: 0 }}
      ></iframe>
    </div>
  );
};

export default IframeTest;
