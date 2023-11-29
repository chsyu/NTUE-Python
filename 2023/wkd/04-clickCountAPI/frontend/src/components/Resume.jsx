import { Link } from "react-router-dom";

function Resume() {
  return (
    <article className="resume py-4 py-sm-5">
      <div className="container d-flex flex-column align-items-center">
        <h1>課程概述</h1>
        <hr className="divider--light" />
        <p className="text-justify resume__description py-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          laborum corrupti ut iure aliquam. Quod, perferendis. Libero tempore
          iste, animi sint numquam illum quasi laboriosam unde pariatur quidem!
          Suscipit consequatur nihil dolor impedit temporibus ad cum, voluptatum
          odit ratione ullam eligendi amet beatae aliquid eaque nesciunt optio
          nobis ducimus itaque. Voluptatibus aspernatur assumenda quod quo error
          consequuntur, vero iusto reprehenderit repellat maiores, sapiente
          dolores voluptates minima. Alias dolore assumenda fuga quae repellat
          voluptatum quo, saepe exercitationem perspiciatis reiciendis modi
          tempora. Recusandae explicabo iusto corporis nam numquam dignissimos,
          necessitatibus, iure non culpa repellat repudiandae temporibus! Saepe
          excepturi tempore iusto eos sit!
        </p>
        <Link to="/resume">
          <div className="btn btn--lg align-self-center">進一步了解</div>
        </Link>
      </div>
    </article>
  );
}

export default Resume;
