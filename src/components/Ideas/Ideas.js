import React from 'react';
import { Modal, Form, Input, Select, Row, Col, Button, Card, Icon } from 'antd';
import { connect } from 'react-redux';
import idea from '../Idea/idea';


class Ideas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      isEditing: false,
      ideaEditingId: ''
    }

    this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handleViabilityInputChange = this.handleViabilityInputChange.bind(this);
    this.handleOwnerInputChange = this.handleOwnerInputChange.bind(this);
  }

  clearFormFields = () => {
    this.props.form.setFieldsValue({
      title: '',
      description: '',
      viability: '',
      owner: ''
    });
  }

  handleTitleInputChange = event => {
    this.props.form.setFieldsValue({ title: event.target.value });
  }

  handleDescriptionInputChange = event => {
    this.props.form.setFieldsValue({ description: event.target.value });
  }

  handleViabilityInputChange = value => {
    this.props.form.setFieldsValue({ viability: value });
  }

  handleOwnerInputChange = event => {
    this.props.form.setFieldsValue({ owner: event.target.value });
  }

  handleCancel = () => {
    this.setState({ modalVisible: false });
  }

  handleSubmit = () => {
    const payload = {
      id: this.state.isEditing ? this.state.ideaEditingId : Math.floor(Math.random() * 1000),
      title: this.props.form.getFieldValue('title'),
      description: this.props.form.getFieldValue('description'),
      viability: this.props.form.getFieldValue('viability'),
      owner: this.props.form.getFieldValue('owner'),
      identificationDate: '2020-01-01'
    };

    if (this.state.isEditing) {
      this.props.editIdea(payload);
      this.setState({isEditing: false, ideaEditingId: ''});
    }
    else {
      this.props.addIdea(payload);
    }

    this.setState({ modalVisible: false });
    this.clearFormFields();
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  handleEditIdea = (id) => {
    this.showModal();

    const selectedIdea = { ...this.props.ideas.find(idea => idea.id === id) };

    this.props.form.setFieldsValue({
      title: selectedIdea.title,
      description: selectedIdea.description,
      viability: selectedIdea.viability,
      owner: selectedIdea.owner
    });

    this.setState({ isEditing: true, ideaEditingId: selectedIdea.id });
  }

  render () {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;

    const Idea = idea;

    return (
      <>
        <Button type="primary" onClick={this.showModal}>Create an idea</Button>

        {
          this.props.ideas.map(idea => {
            return (
              <Card title={
                <span>{idea.title} <a><Icon onClick={() => this.handleEditIdea(idea.id)} type="edit" /></a></span>
              } bordered={false} style={{ width: 300 }} key={idea.id}>
                <Idea
                  key={idea.id}
                  description={idea.description}
                  viability={idea.viability}
                  identificationDate={idea.identificationDate}
                  owner={idea.owner}
                  conclusionDate={idea.conclusionDate}
                />
              </Card>
            )
          })
        }

        <Modal
          title={this.handleModalTitle}
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
          footer={
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              Submit
          </Button>
          }
        >
          <Row>
            <Col span={20}>
              <Form {...formItemLayout}>
                <Form.Item label="Idea Title">
                  {
                    getFieldDecorator('title', {
                      rules: [{ required: true, message: 'Enter a title for idea' }]
                    })(
                      <Input type="text" placeholder="Idea title" onChange={this.handleTitleInputChange} />
                    )
                  }
                </Form.Item>
                <Form.Item label="Description">
                  {
                    getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Enter a description for idea' }]
                    })(
                      <Input type="text" placeholder="Description of idea" onChange={this.handleDescriptionInputChange} />
                    )
                  }
                </Form.Item>
                <Form.Item label="Viability">
                  {
                    getFieldDecorator('viability', {
                      rules: [{ required: true }]
                    })(
                      <Select
                        placeholder="Select the viability of idea"
                        onChange={this.handleViabilityInputChange}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    )
                  }
                </Form.Item>
                <Form.Item label="Owner">
                  {
                    getFieldDecorator('owner', {
                      rules: [{ required: true, message: 'Enter the owner of idea' }]
                    })(
                      <Input type="text" placeholder="Owner of idea" onChange={this.handleOwnerInputChange} />
                    )
                  }
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </>
    )
  }
};

const mapStateToProps = state => {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addIdea: (payload) => dispatch({ type: "ADD_IDEA", payload: payload }),
    editIdea: (payload) => dispatch({ type: "EDIT_IDEA", payload: payload })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'Ideas' })(Ideas));