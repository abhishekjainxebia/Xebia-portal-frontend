
import React, { Component } from "react";
import PropTypes from "prop-types";
import {Checkbox} from 'material-ui';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

export default class EmployeeAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            samePermAndCurAddress: false,
            disablePerAdd: true,
            disableCurAdd: true
        }
    }

    componentDidMount() {
    }

    saveUpdatedAddress(addressType) {
        const callbackResult = (data) => {
            if (data.code != 1008) {
                alert(data.description)
            } else {
                alert('Employee Address Successfully Updated')
                this.setState({
                    disabled: true,
                    create: false
                })
                this.props.fetchEmployees();
            }
        }
        if (addressType == 'permanent')
            this.props.saveUpdatedAddress(this.props.employeeDetails.emp_id, this.props.employeePermanentAddress, callbackResult);
        else if (addressType =='current'){
            this.props.saveUpdatedAddress(this.props.employeeDetails.emp_id, this.props.employeeCurrentAddress, callbackResult);
        }
    }

    changeValuePermanentAddress = (e, e_name, e_value) => {
        let employeePermanentAddress = this.props.employeePermanentAddress;
        if (e == null) {
            console.log(e_name + " " + e_value)
            employeePermanentAddress = Object.assign({}, employeePermanentAddress, { [e_name]: e_value })
            console.log(employeePermanentAddress.country)
        } else {
            const { value, name } = e.target;
            console.log(e.target.name + e.target.value)
            employeePermanentAddress = Object.assign({}, employeePermanentAddress, { [name]: value })
        }
        this.props.updatePermanentAddress(employeePermanentAddress);
    }

    changeValueCurrentAddress = (e, e_name, e_value) => {
        let employeeCurrentAddress = this.props.employeeCurrentAddress;
        if (e == null) {
            console.log(e_name + " " + e_value)
            employeeCurrentAddress = Object.assign({}, employeeCurrentAddress, { [e_name]: e_value })
            console.log(employeeCurrentAddress.country)
        } else {
            const { value, name } = e.target;
            console.log(e.target.name + e.target.value)
            employeeCurrentAddress = Object.assign({}, employeeCurrentAddress, { [name]: value })
        }
        this.props.updateCurrentAddress(employeeCurrentAddress);
    }

    currentAddSamePermanentAdd(e) {
        this.setState({
            samePermAndCurAddress:true
        })
        let employeeCurrentAddress = this.props.employeePermanentAddress;
        employeeCurrentAddress = Object.assign({},employeeCurrentAddress,{address_type:"current"})
        this.props.updateCurrentAddress(employeeCurrentAddress);
        
    }

    editPerAddress() {
        this.setState({
            disablePerAdd: false
        })
    }

    render() {
        let employeePermanentAddress = this.props.employeePermanentAddress || [];
        let employeeCurrentAddress = this.props.employeeCurrentAddress || [];
        return (
            <div>
                <div className="component-view container permanent-address">
                    <div className="component-head">
                        <h2>Permanent Address
                            <i className="fa fa-arrow-circle-up"></i>
                            <button 
                                onClick={() => this.setState({ disablePerAdd: false })} 
                                detail={this.state.create ? true : false} 
                                className="pull-right btn btn-xebia"
                                hidden={true}>
                                EDIT <i className="fa fa-edit"></i>
                            </button>
                        </h2>
                        <hr/>
                    </div>
                    <div className="component-body row" id="permanent-address">
                        <div className="component-body col-sm-12">
                            <div className="form-group row">
                                <label for="add_line_1" className="col-sm-2">Address Line 1:</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.changeValuePermanentAddress(e)} 
                                    // disabled={this.state.disablePerAdd} 
                                    className="form-control col-sm-9" 
                                    id="add_line1" 
                                    value={employeePermanentAddress.add_line1} 
                                    placeholder="Enter Address Line 1" 
                                    name="add_line1" />
                            </div>
                        </div>
                        <div className="component-body col-sm-12">
                            <div className="form-group row">
                                <label for="add_line_2" className="col-sm-2">Address Line 2:</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.changeValuePermanentAddress(e)} 
                                    // disabled={this.state.disablePerAdd} 
                                    className="form-control col-sm-9" 
                                    id="add_line2" 
                                    value={employeePermanentAddress.add_line2} 
                                    placeholder="Enter Address Line 2" 
                                    name="add_line2" />
                            </div>
                        </div>
                        <div className="component-body-left col-sm-6">
                            <div className="form-group row">
                                <label for="country" className="col-sm-4">Country:</label>
                                <div className="form-control col-sm-6">
                                    <CountryDropdown
                                        id="country"
                                        value={employeePermanentAddress.country}
                                        name="country"
                                        // disabled={this.state.disablePerAdd}
                                        onChange={(e) => this.changeValuePermanentAddress(null, 'country', e)} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="component-body-right col-sm-6">
                            <div className="form-group row">
                                <label for="state" className="col-sm-4">State:</label>
                                <span className="form-control col-sm-6">
                                    <RegionDropdown
                                        //className={`form-control col-sm-6`}
                                        // styleName={'form-control col-sm-6'}
                                        id="state"
                                        name="state"
                                        country={employeePermanentAddress.country}
                                        value={employeePermanentAddress.state}
                                        //disabled={this.state.disablePerAdd}
                                        onChange={(e) => this.changeValuePermanentAddress(null, 'state', e)} 
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="component-body-left col-sm-6">
                            <div className="form-group row">
                                <label for="PIN" className="col-sm-4">PIN:</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.changeValuePermanentAddress(e)} 
                                    // disabled={this.state.disablePerAdd} 
                                    value={employeePermanentAddress.pincode} 
                                    className="form-control col-sm-6" 
                                    id="email" 
                                    placeholder="Enter Email" 
                                    name="email" />
                            </div>
                        </div>
                    </div>
                    <div className="component-footer">
                        <button
                            className="pull-right btn btn-xebia"
                            onClick={() => this.saveUpdatedAddress('permanent')} >
                            <i className="fa fa-save"></i>
                            Save
                        </button>
                        <button
                            className="pull-right btn btn-xebia"
                            onClick={() => this.onCancel()} >
                            <i className="fa fa-save"></i>
                            Cancel
                        </button>
                    </div>
                </div>
                <hr />
                <div className="component-view container current-address">
                    <div className="component-head row">
                        <div className="col-sm-4">
                            <h2>Current Address &nbsp;
                            <button 
                                onClick={() => this.setState({ disableCurAdd: false })} 
                                className="btn btn-xebia"
                                hidden={true}>
                                EDIT 
                                <i className="fa fa-edit"></i>
                            </button>
                            </h2>
                        </div>
                    </div>
                    <div>
                        <label for="emp_id">Same as Permanent:</label>
                        <Checkbox
                            disabled={this.state.samePermAndCurAddress}
                            onChange={(e) => this.currentAddSamePermanentAdd(e)}
                            checked={this.state.samePermAndCurAddress}
                        />
                        <hr/>
                    </div>
                    <div className="component-body row" id="current-address">
                        <div className="component-body col-sm-12">
                            <div className="form-group row">
                                <label for="add_line_1" className="col-sm-2">Address Line 1:</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.changeValueCurrentAddress(e)} 
                                    // disabled={this.state.disableCurAdd} 
                                    className="form-control col-sm-9" 
                                    id="add_line1" 
                                    value={employeeCurrentAddress.add_line1} 
                                    placeholder="Enter Address Line 1" 
                                    name="add_line1" />
                            </div>
                        </div>
                        <div className="component-body col-sm-12">
                            <div className="form-group row">
                                <label for="add_line_2" className="col-sm-2">Address Line 2:</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.changeValueCurrentAddress(e)} 
                                    // disabled={this.state.disableCurAdd} 
                                    className="form-control col-sm-9" 
                                    id="add_line2" value={employeeCurrentAddress.add_line2} 
                                    placeholder="Enter Address Line 2" 
                                    name="add_line2" />
                            </div>
                        </div>
                        <div className="component-body-left col-sm-6">
                            <div className="form-group row">
                                <label for="country" className="col-sm-4">Country:</label>
                                <div className="form-control col-sm-6">
                                    <CountryDropdown
                                        id="country"
                                        value={employeeCurrentAddress.country}
                                        name="country"
                                        // disabled={this.state.disableCurAdd}
                                        onChange={(e) => this.changeValueCurrentAddress(null, 'country', e)} />
                                </div>
                            </div>
                        </div>
                        <div className="component-body-right col-sm-6">
                            <div className="form-group row">
                                <label for="state" className="col-sm-4">State:</label>
                                <div className="form-control col-sm-6">
                                    <RegionDropdown
                                        id="state"
                                        name="state"
                                        country={employeeCurrentAddress.country}
                                        value={employeeCurrentAddress.state}
                                        //disabled={this.state.disablePerAdd}
                                        onChange={(e) => this.changeValueCurrentAddress(null, 'state', e)} />
                                </div>
                            </div>
                        </div>
                        <div className="component-body-left col-sm-6">
                            <div className="form-group row">
                                <label for="PIN" className="col-sm-4">PIN:</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => this.changeValueCurrentAddress(e)} 
                                    // disabled={this.state.disableCurAdd} 
                                    value={employeeCurrentAddress.pincode} 
                                    className="form-control col-sm-6" 
                                    id="pincode" 
                                    placeholder="Enter Pin Code" 
                                    name="pincode" />
                            </div>
                        </div>
                    </div>
                    <div className="component-footer">
                        <button 
                            className="pull-right btn btn-xebia" 
                            onClick={() => this.saveUpdatedAddress('current')} >
                            Save
                        </button>
                        <button 
                            className="pull-right btn btn-xebia" 
                            // onClick={() => this.saveUpdatedAddress('current')} 
                            >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


EmployeeAddress.defaultProps = {

}

EmployeeAddress.propTypes = {

}