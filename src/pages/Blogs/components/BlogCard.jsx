import { useState } from "react";
import { ArrowUpRight, Calendar, Share2 } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { toast } from "sonner";
import { shareLink } from "../../../utils/shareLink";

const BlogCard = ({ id, title, content, created_at, images, returnTo }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const location = useLocation();
  const returnPath = returnTo || location.state?.returnTo || location.pathname;
  const image = Array.isArray(images) ? images[0] : images;
  const excerpt = typeof content === "string"
    ? content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    : "Read the latest advice and updates from Negus Consultants.";
  const date = created_at && !Number.isNaN(new Date(created_at).getTime())
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(created_at))
    : "Negus Consultants";

  const handleShare = async () => {
    try {
      const result = await shareLink({
        title: title || "Negus Consultants article",
        text: "Read this article from Negus Consultants.",
        url: `${window.location.origin}/blogs/${id}`,
      });
      if (result === "copied") toast.success("Article link copied.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        toast.error(error?.message || "Could not share this article.");
      }
    }
  };

  return (
    <article className="public-blog-card">
      <NavLink className="public-blog-image-link" to={`/blogs/${id}`} state={{ returnTo: returnPath }} aria-label={`Read ${title}`}>
        {image && !imageFailed ? (
          <img src={image} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        ) : (
          <div className="public-blog-image-placeholder" aria-hidden="true"><span>NEGUS<br />JOURNAL</span></div>
        )}
      </NavLink>
      <div className="public-blog-card-body">
        <div className="public-blog-date"><Calendar aria-hidden="true" /> {date}</div>
        <h3><NavLink to={`/blogs/${id}`} state={{ returnTo: returnPath }}>{title || "From the Negus team"}</NavLink></h3>
        <p>{excerpt}</p>
        <div className="public-blog-card-actions">
          <NavLink className="public-blog-read-link" to={`/blogs/${id}`} state={{ returnTo: returnPath }}>
            Read article <ArrowUpRight aria-hidden="true" />
          </NavLink>
          <button className="public-blog-share-button" type="button" onClick={handleShare} aria-label={`Share ${title || "article"}`}>
            <Share2 aria-hidden="true" /> Share
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
