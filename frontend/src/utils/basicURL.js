
export const BASIC_URL = `https://product-masterz-backend.onrender.com/api/v0`;

export const getData = async (table) => {
  const res = await fetch(`${BASIC_URL}/${table}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });

  return res.json();
};

export const getSingleRecord = async (slug) => {
  const res = await fetch(`${BASIC_URL}/pages/${slug}`, {
    cache: "no-store"
  });

  return res.json();
};

export const getBlog = async (tableId) => {
  const res = await fetch(`${BASIC_URL}/Articles/${tableId}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  });

  const data = await res.json()
  return data
};
