import Link from "next/link";
import React from "react";

function SingleColumn({ item }) {
  const { Title, titleLink } = item.fields;

  return (
    <li className="ml-4">
      <Link
        href={titleLink}
        passHref
        target="_blank"
        className="text-capitalize "
      >
        {Title}
      </Link>
    </li>
  );
}

export default SingleColumn;
