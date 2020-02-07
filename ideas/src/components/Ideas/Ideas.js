import React from 'react';
import { Modal, Form, Input, Select, Row, Col, Button, Card, Icon } from 'antd';
import { connect } from 'react-redux';
import idea from '../Idea/idea';
import { fetchIdeas } from '../../store/Ideas/action';
import * as situations from '../../constants/Ideas/ideas';
import moment from 'moment';

class Ideas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      isEditing: false,
      idea: {
        id: '',
        title: '',
        description: '',
        viability: '',
        situation: '',
        owner: '',
        identificationDate: '',
        conclusionDate: ''
      },
      isFiltering: false
    }

    this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handleViabilityInputChange = this.handleViabilityInputChange.bind(this);
    this.handleOwnerInputChange = this.handleOwnerInputChange.bind(this);
    this.handleSituationInputChange = this.handleSituationInputChange.bind(this);
    this.handleIdeaFilterInputChange = this.handleIdeaFilterInputChange.bind(this);
  }

  componentDidMount () {
    this.props.fetchIdeas();
  };

  showModal = () => {
    this.props.form.validateFields();
    this.setState({
      modalVisible: true
    });
  };

  clearData = () => {
    if (this.state.isEditing) {
      this.props.form.setFieldsValue({
        description: '',
        viability: '',
        situation: ''
      });
    }
    else {
      this.props.form.setFieldsValue({
        title: '',
        description: '',
        viability: '',
        situation: '',
        owner: ''
      });
    }
  }

  handleTitleInputChange = event => {
    const modifiedIdea = { ...this.state.idea };
    modifiedIdea.title = event.target.value;
    this.setState({ idea: modifiedIdea });
  }

  handleDescriptionInputChange = event => {
    const modifiedIdea = { ...this.state.idea };
    modifiedIdea.description = event.target.value;
    this.setState({ idea: modifiedIdea });
  }

  handleViabilityInputChange = value => {
    const modifiedIdea = { ...this.state.idea };
    modifiedIdea.viability = value;
    this.setState({ idea: modifiedIdea });
  }

  handleOwnerInputChange = event => {
    const modifiedIdea = { ...this.state.idea };
    modifiedIdea.owner = event.target.value;
    this.setState({ idea: modifiedIdea });
  }

  handleSituationInputChange = value => {
    const modifiedIdea = { ...this.state.idea };
    modifiedIdea.situation = value;
    this.setState({ idea: modifiedIdea });
  }

  handleCancel = () => {
    this.setState({ modalVisible: false });

    // Reset idea state after close modal
    this.setState({
      idea: {
        id: '',
        title: '',
        description: '',
        viability: '',
        situation: '',
        owner: '',
        identificationDate: '',
        conclusionDate: ''
      }
    });

    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    }

    this.clearData();
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = () => {
    const payload = {
      title: this.state.idea.title,
      description: this.state.idea.description,
      identificationDate: undefined,
      viability: this.state.idea.viability,
      situation: this.state.idea.situation,
      owner: this.state.idea.owner,
      conclusionDate: (this.state.idea.situation === 3 || this.state.idea.situation === 4) ? moment().format('YYYY-MM-DD hh:mm:ss') : null
    };

    if (this.state.isEditing) {
      const currentIdentificationDate = this.props.ideas.find(idea => this.state.idea.id === idea.id).identificationDate;
      payload.identificationDate = currentIdentificationDate;
      payload.id = this.state.idea.id;

      this.props.modifyIdea({idea: payload});
      this.setState({ isEditing: false });
    }
    else {
      payload.identificationDate = moment().format('YYYY-MM-DD hh:mm:ss');
      this.props.createIdea({ idea: payload });
    }

    this.setState({ modalVisible: false });

    // Reset idea state after submit
    this.setState({
      idea: {
        id: '',
        title: '',
        description: '',
        viability: '',
        situation: '',
        owner: '',
        identificationDate: '',
        conclusionDate: ''
      }
    });

    this.clearData();
  }

  handleEditIdea = (id) => {
    this.showModal();

    const selectedIdea = { ...this.props.ideas.find(idea => idea.id === id) };

    this.setState({ idea: selectedIdea });

    this.props.form.setFieldsValue({
      description: selectedIdea.description,
      viability: selectedIdea.viability,
      situation: selectedIdea.situation
    });

    this.setState({
      isEditing: true
    });
  }

  handleIdeaFilterInputChange = event => {
    const searchText = event.target.value;

    if (searchText !== '' && this.props.ideas.length > 0) {
      this.setState({ isFiltering: true });
      this.props.filterIdea(searchText);
    }
    else {
      this.setState({ isFiltering: false });
    }
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

    const { getFieldDecorator, getFieldsError } = this.props.form;
    const Option = Select.Option;

    const Idea = idea;

    const ideasCard = () => {
      const ideas = this.state.isFiltering ? this.props.filteredIdea : this.props.ideas;

      return (
        <div style={{ padding: "55px" }}>
          <Row gutter={16}>
            {
              ideas.map(idea => {
                return (
                  <Col span={8} key={idea.id}>
                    <Card title={
                      <span>
                        {idea.title}
                        <a style={{ marginLeft: "5px" }}><Icon onClick={() => this.handleEditIdea(idea.id)} type="edit" /></a>
                        <a style={{ float: "right" }}><Icon onClick={() => this.props.deleteIdea({ id: idea.id })} type="delete" /></a>
                      </span>
                    } bordered={false} className={idea.viability === 5 ? "starredCardIdea" : "traditionalCardIdea"} key={idea.id}>
                      <Idea
                        key={idea.id}
                        description={idea.description}
                        viability={idea.viability}
                        identificationDate={moment(idea.identificationDate).format("MMMM Do YYYY, h:mm:ss a")}
                        situation={idea.situation}
                        owner={idea.owner}
                        conclusionDate={
                          idea.conclusionDate
                            ?
                            moment(idea.conclusionDate).format("MMMM Do YYYY, h:mm:ss a")
                            :
                            ""
                        }
                      />
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      );
    };

    const modalFormIdea = () => {
      return (
        <Form {...formItemLayout}>
          {
            !this.state.isEditing ? (
              <Form.Item label="Idea Title">
                {
                  getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Enter a title for idea' }]
                  })(
                    <Input type="text" placeholder="Idea title" onChange={this.handleTitleInputChange} />
                  )
                }
              </Form.Item>
            ) : null
          }
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
                  onChange={this.handleViabilityInputChange}>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={5}>5</Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="Situation">
            {
              getFieldDecorator('situation', {
                rules: [{ required: true }]
              })(
                <Select
                  onChange={this.handleSituationInputChange}>
                  <Option value={1}>{situations.REGISTERED}</Option>
                  <Option value={2}>{situations.UNDER_DEVELOPMENT}</Option>
                  <Option value={3}>{situations.FINISHED}</Option>
                  <Option value={4}>{situations.CANCELLED}</Option>
                </Select>
              )
            }
          </Form.Item>
          {
            !this.state.isEditing ? (
              <Form.Item label="Owner">
                {
                  getFieldDecorator('owner', {
                    rules: [{ required: true, message: 'Enter the owner of idea' }]
                  })(
                    <Input type="text" placeholder="Owner of idea" onChange={this.handleOwnerInputChange} />
                  )
                }
              </Form.Item>
            ) : null
          }
        </Form>
      );
    }

    const filterFormIdea = () => {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item>
            {
              getFieldDecorator('filterIdeaInput', {
                rules: [{ required: false, message: 'Enter the title of idea' }]
              })(
                <Input type="text" placeholder="Find idea by title" onChange={this.handleIdeaFilterInputChange} disabled={this.props.ideas.length === 0} />
              )
            }
          </Form.Item>
        </div>
      )
    }

    return (
      <>
        {filterFormIdea()}

        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <Button type="primary" onClick={this.showModal} style={{ marginBottom: "10px", justifyContent: "center" }}>Create an idea</Button>
        </div>

        {ideasCard()}

        <Modal
          title={this.handleModalTitle}
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
          footer={
            <Button key="submit" type="primary" onClick={this.handleSubmit} disabled={this.hasErrors(getFieldsError())}>
              Submit
            </Button>
          }
        >
          <Row>
            <Col span={20}>
              {modalFormIdea()}
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
    filterIdea: (title) => dispatch({ type: "FILTER_IDEA", payload: title }),
    fetchIdeas: () => dispatch({ type: "FETCH_IDEAS" }),
    createIdea: (payload) => dispatch({ type: "CREATE_IDEA", ...payload }),
    deleteIdea: (payload) => dispatch({ type: "DELETE_IDEA", id: payload.id }),
    modifyIdea: (payload) => dispatch({ type: "MODIFY_IDEA", ...payload })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'Ideas' })(Ideas));