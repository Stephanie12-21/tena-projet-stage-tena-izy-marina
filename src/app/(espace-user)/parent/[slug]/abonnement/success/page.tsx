"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const SuccessSubscriptionPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`/parent/${slug}/abonnement`);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router, slug]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🎉 Votre abonnement a été effectué avec succès !</h1>
      <p>
        Vous allez être redirigé vers votre page abonnement dans 5 secondes...
      </p>
    </div>
  );
};

export default SuccessSubscriptionPage;
