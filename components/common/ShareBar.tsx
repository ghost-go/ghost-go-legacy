import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  VKShareButton,
  VKIcon,
  LineShareButton,
  LineIcon,
  WeiboShareButton,
  WeiboIcon,
} from 'react-share';
import {Grid} from 'semantic-ui-react';

const ShareBar = ({
  shareUrl,
  shareTitle,
  shareImage,
}: {
  shareUrl: string;
  shareTitle: string;
  shareImage: string;
}) => (
  <>
    <FacebookShareButton url={shareUrl} quote={shareTitle}>
      <FacebookIcon size={32} />
    </FacebookShareButton>
    <TwitterShareButton url={shareUrl} title={shareTitle}>
      <TwitterIcon size={32} />
    </TwitterShareButton>
    <RedditShareButton url={shareUrl} title={shareUrl}>
      <RedditIcon size={32} />
    </RedditShareButton>
    <LineShareButton url={shareUrl} title={shareUrl}>
      <LineIcon size={32} />
    </LineShareButton>
    <VKShareButton url={shareUrl} title={shareUrl} image={shareImage}>
      <VKIcon size={32} />
    </VKShareButton>
    <WeiboShareButton url={shareUrl} title={shareUrl} image={shareImage}>
      <WeiboIcon size={32} />
    </WeiboShareButton>
  </>
);

export default ShareBar;
