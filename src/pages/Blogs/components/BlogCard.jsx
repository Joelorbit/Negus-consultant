import { useState } from "react";
import { ArrowUpRight, Calendar } from "iconoir-react";
import { NavLink } from "react-router";

const BlogCard = ({ id, title, content, created_at, images, category }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const image = Array.isArray(images) ? images[0] : images;
  const excerpt = typeof content === "string"
    ? content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    : "Read the latest advice and updates from Negus Consultants.";
  const date = created_at && !Number.isNaN(new Date(created_at).getTime())
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(created_at))
    : "Negus Consultants";

  return (
    <article className="public-blog-card">
      <NavLink className="public-blog-image-link" to={`/blogs/${id}`} aria-label={`Read ${title}`}>
        {image && !imageFailed ? (
          <img src={image} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        ) : (
          <div className="public-blog-image-placeholder" aria-hidden="true"><span>NEGUS<br />JOURNAL</span></div>
        )}
        <span className="public-blog-category">{category || "Guidance"}</span>
      </NavLink>
      <div className="public-blog-card-body">
        <div className="public-blog-date"><Calendar aria-hidden="true" /> {date}</div>
        <h3><NavLink to={`/blogs/${id}`}>{title || "From the Negus team"}</NavLink></h3>
        <p>{excerpt}</p>
        <NavLink className="public-blog-read-link" to={`/blogs/${id}`}>
          Read article <ArrowUpRight aria-hidden="true" />
        </NavLink>
      </div>
    </article>
  );
};

export default BlogCard;
