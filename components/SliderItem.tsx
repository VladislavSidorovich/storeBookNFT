
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { open, openBookIframe, openPreviewIframe } from '../store/features/orderSlice';
import cn from 'classnames';
import { formatUnits } from 'viem';
import { fetchIPFSData } from '../methods/api/fetchIPSF';

type SliderItemProps = {
  id: number;
  price: bigint;
  supplyRemain: number;
  uri: string;
  previewText: string;
  actionText: string;
};

export type IPFSData = {
  name: string;
  image: string;
  description: string;
  author: string;
  date: string;
  fulltitle: string;
  preview: string;
  authorInfo: string;
  attributes: string[];
};

const SliderItem: React.FC<SliderItemProps> = ({ id, price, supplyRemain, uri, previewText, actionText }) => {
  const [content, setContent] = useState<IPFSData | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.order);
  const product = products.find((el) => el.id === id);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching data for ID: ${id}, URI: ${uri}`);  // Проверка URI при загрузке данных
        const data = await fetchIPFSData(uri);
        setContent(data);
      } catch (error) {
        console.error("Error fetching IPFS data:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [uri, id]);  // Добавление id в зависимости useEffect

  const redirectToArticle = () => {
    if (content?.fulltitle) {
      window.open(content.fulltitle, "_blank");
    } else {
      console.error("Full title not available for redirect.");
    }
  };

  console.log(`SliderItem ID: ${id}, Content: ${content ? content.name : 'No content'}`);  // Проверка ID и контента в компоненте

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!content) {
    return <div className="error">Error loading content</div>;
  }

  return (
    <div className="nft">
      <h3 className="nft__heading">{content.name}</h3>
      <p className="nft__heading">{content.authorInfo}</p>

      <p className="nft__caption">Стоимость:</p>
      <p className="nft__price">{formatUnits(price, 18)} MATIC</p>
      <p className="nft__caption">(Около 300 рублей РФ)</p>
      <br />
      <p className="nft__caption">Оставшееся количество: {supplyRemain}</p>
      <p className="nft__time">{content.date}</p>

      <button
        onClick={() => {
          console.log(`Dispatching openPreviewIframe with ID: ${id}`);  // Проверка ID перед dispatch
          dispatch(openPreviewIframe(id));
        }}
        className={cn("btn", "btn_1", { active: product?.isCompleted })}
      >
        {previewText}
      </button>

      <button
        onClick={() => dispatch(open(id))}
        className={cn("btn", "btn_2", { active: product?.isCompleted })}
      >
        Приобрести NFT
      </button>

      {product?.isCompleted && (
        <button
          onClick={redirectToArticle}
          className={cn("btn", "btn_3", { active: product.isCompleted })}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SliderItem;