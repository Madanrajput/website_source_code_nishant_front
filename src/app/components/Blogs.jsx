const Blogs = (props) => {
  return (
    <>
      <div className={props.blogCard}>
        <div className="position-relative">
          <a href={props.blogImglink}>
            <img
              src={props.imgSrcBlog}
              className={props.blogClassImg}
              height={220}
              alt={props.blogImgALt}
              fetchpriority="high"
              loading="eager"
              data-no-lazy="1"
            />
          </a>
          <div className="d-flex position-absolute justify-content-md-between justify-content-between w-100 px-3 align-items-end bottom-0 pb-2">
            <div>
              <a href={props.blogBtnHref} className="fs-6 text-white">
                <img src="/images/user.png" width={20} alt="user"
                fetchpriority="high"
  loading="eager"
  data-no-lazy="1"
  /> {props?.writer_name ?? "High Creation"}
              </a>
            </div>
            {/* <div className="d-flex">
              <a href="">
                <img src="/images/share.png" width={20} alt="user" />
              </a>
              <a href="" className="ps-2">
                <img src="/images/comment.png" width={20} alt="user" />
              </a>
            </div> */}
          </div>
        </div>
        <div className="card-body px-3 pt-3">
          <span className="blog_span">{props.blogdate}</span>
          <h5 className="blog-title pt-2">{props.blogTitle}</h5>
          <p
            className="blog-text"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            dangerouslySetInnerHTML={{ __html: props.blogDescription }}>
          </p>
          <a href={props.blogBtnHref} className="btn_continue">
            {props.buttonBlog}
          </a>
        </div>
        {/* </div>
            </div> */}
      </div>
    </>
  );
};

export default Blogs;
