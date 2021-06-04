import {isMobile} from 'react-device-detect';
import {
  Header,
  Button,
  Sidebar,
  Segment,
  Comment,
  Form,
  Icon,
  TextArea,
} from 'semantic-ui-react';

import {openCommentsSlice} from 'slices';
import {useDispatch, useTypedSelector} from 'utils';

const CommentsSidebar = () => {
  const dispatch = useDispatch();
  const open = useTypedSelector(state => state.openComments);
  return (
    <Sidebar
      as={Segment}
      width="wide"
      animation="overlay"
      direction={isMobile ? 'bottom' : 'right'}
      onHide={() => {
        dispatch(openCommentsSlice.actions.makeFalse());
      }}
      visible={open}
    >
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
          <div
            className="absolute top-2 right-2"
            onClick={() => {
              dispatch(openCommentsSlice.actions.makeFalse());
            }}
          >
            <Icon name="times" />
          </div>
        </Header>

        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author as="a">Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
          <Comment.Content>
            <Comment.Author as="a">Elliot Fu</Comment.Author>
            <Comment.Metadata>
              <div>Yesterday at 12:30AM</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
          <Comment.Group>
            <Comment>
              <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
              <Comment.Content>
                <Comment.Author as="a">Jenny Hess</Comment.Author>
                <Comment.Metadata>
                  <div>Just now</div>
                </Comment.Metadata>
                <Comment.Text>Elliot you are always so right :)</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Comment>

        <Comment>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
          <Comment.Content>
            <Comment.Author as="a">Joe Henderson</Comment.Author>
            <Comment.Metadata>
              <div>5 days ago</div>
            </Comment.Metadata>
            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        <Form reply>
          <Form.TextArea style={{height: '6em'}} />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </Sidebar>
  );
};

export default CommentsSidebar;
