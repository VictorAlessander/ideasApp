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

  showModal = () => {
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

  handleSubmit = () => {
    const payload = { ...this.state.idea };

    if (this.state.isEditing) {
      const currentIdentificationDate = this.props.ideas.find(idea => this.state.idea.id === idea.id).identificationDate;
      payload.identificationDate = currentIdentificationDate;

      this.props.editIdea(payload);
      this.setState({ isEditing: false });
    }
    else {
      this.props.addIdea(payload);
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

  render() {

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

    const ideasCard = () => {
      debugger;
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
                        <a style={{ float: "right" }}><Icon onClick={() => this.props.removeIdea(idea.id)} type="delete" /></a>
                      </span>
                    } bordered={false} className={idea.viability == 5 ? "starredCardIdea" : "traditionalCardIdea"} key={idea.id}>
                      <Idea
                        key={idea.id}
                        description={idea.description}
                        viability={idea.viability}
                        identificationDate={idea.identificationDate}
                        owner={idea.owner}
                        conclusionDate={idea.conclusionDate}
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
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
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
                  <Option value="1">Registrado</Option>
                  <Option value="2">Em Desenvolvimento</Option>
                  <Option value="3">Concluída</Option>
                  <Option value="4">Cancelada</Option>
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
                <Input type="text" placeholder="Find idea by title" onChange={this.handleIdeaFilterInputChange} />
              )
            }
          </Form.Item>
          {/* <Button type="primary" onClick={this.handleFilterIdea}>
            Submit
          </Button> */}
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
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
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
    addIdea: (payload) => dispatch({ type: "ADD_IDEA", payload: payload }),
    editIdea: (payload) => dispatch({ type: "EDIT_IDEA", payload: payload }),
    removeIdea: (id) => dispatch({ type: "REMOVE_IDEA", payload: id }),
    filterIdea: (title) => dispatch({ type: "FILTER_IDEA", payload: title })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'Ideas' })(Ideas));