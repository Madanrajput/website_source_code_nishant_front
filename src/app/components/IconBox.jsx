const IconBox = (props) => {
  return (
    <div>
      <div className="box d-flex me-2">
        <div className="align-self-center"> 
          <img
            src={props.iconUrl}
            alt={props.iconAlt}
            width={props.iconWidth}
            className="me-2"
            fetchpriority="high"
            loading="eager"
            data-no-lazy="1"
          />
        </div>
        <div className="align-self-center"> 
          <p className={props.descr}>{props.iconDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default IconBox;
