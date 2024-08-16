import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import WishlistCard from "./WishlistCard";

export default function MyWishlist({ user }) {
  const [wishlist, setWishlist] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateWishlist();
  }, []);

  const generateWishlist = async () => {
    const res = await axios.get(`/api/wishlist`);
    console.log(res);
    setWishlist(res.data);
  };

  const wishlistCards = wishlist.map((wish) => (
    <WishlistCard key={wish.itemId} wish={wish} />
  ));

  return <Row>{wishlistCards}</Row>;
}
