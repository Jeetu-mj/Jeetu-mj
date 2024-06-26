import React, { useState, createRef, useEffect } from 'react'
import Select from 'react-select';

function GeneralHs({ onShift, setColname, onSubmit }) {

  const [name, setName] = useState('')
  const [shortNames, setShortNames] = useState([])
  const [coltype, setColtype] = useState('')
  const [category, setCategory] = useState([]);
  const [colfull, setColFull] = useState('')
  const [colshort, setColshort] = useState('')
  const [file, setFile] = useState('')
  const [cover, setCover] = useState('')
  const [mobcover, setMobcover] = useState('')
  const [affby, setAffby] = useState('')
  const [appby, setAppby] = useState('')
  const [gender, setGender] = useState('')
  const [allcount, setAllcount] = useState('')
  const [zone, setZone] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [pin, setPin] = useState('')
  const [add, setAdd] = useState('')
  const [mark, setMark] = useState('')
  const [web, setWeb] = useState('')
  const [mail, setMail] = useState([''])
  const [mob, setMob] = useState([''])
  const [Dept, setDept] = useState('')
  const [ser, setSer] = useState('')
  const [fac, setFac] = useState('')
  const [spec, setSpec] = useState('')
  const [estab, setEstab] = useState('')




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('hostype', coltype);
      formData.append('category', category);
      formData.append('hosfull', colfull);
      formData.append('hosshort', colshort);
      formData.append('file', file); // Append file
      formData.append('cover', cover); // Append cover
      formData.append('mobcover', mobcover); // Append mobcover
      formData.append('affby', affby)
      formData.append('appby', appby)
      formData.append('gender', gender)
      formData.append('zone', zone);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('pin', pin);
      formData.append('add', add);
      formData.append('mark', mark);
      formData.append('web', web);
      formData.append('dept', Dept)
      formData.append('fac', fac)
      formData.append('ser', ser)
      formData.append('estab', estab)
      formData.append('spec', spec)



      mail.forEach((email, index) => {
        formData.append(`mail[${index}]`, email);
      });


      mob.forEach((number, index) => {
        formData.append(`mob[${index}]`, number);
      });

      const currentDate = new Date()
      formData.append('added_on', currentDate);

      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      formData.append("UniqueId", randomNumber)



      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const response = await axios.post('http://localhost:4000/api/hsgendetails', formData)
      console.log('Success:', response);
      onShift();
      onSubmit();
      setColname(colfull);
    } catch (error) {

    }

  }

  const options = [
    { value: 'Paramedical', label: 'Paramedical' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'Dental', label: 'Dental' },
    { value: 'Science', label: 'Science' },
    { value: 'Veterinary', label: 'Veterinary' },
    { value: 'Ayurveda', label: 'Ayurveda' }
  ];

  const optionsgender = [
    { value: 'Co.Ed', label: 'Co.Ed' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];


  const imginput = createRef();
  const coverinput = createRef();
  const mobinput = createRef();

  useEffect(() => {
    const fetchShortNames = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getallnames');
        setShortNames(response.data.shortNames);
      } catch (error) {
        console.error('Error fetching short names:', error);
      }
    };

    fetchShortNames();
  }, []);

  const optionsfir = [
    ...shortNames.map((name) => ({ value: name, label: name }))

  ];


  const [mapcourses, setMapCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getallcourses');
        setMapCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const optionsmap = [
    ...mapcourses.map((courses) => ({ value: courses, label: courses }))
  ];



  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchcountries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getallcountries')
        setCountries(response.data.allcountries)
        // console.log(countries)
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }
    fetchcountries();
  }, [])

  const optionscountries = [
    ...countries.map((countnames) => ({ value: countnames, label: countnames }))
  ]

  const [allzone, setAllzone] = useState([])

  useEffect(() => {
    const fetchzones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getallzones')
        setAllzone(response.data.Zones)
        // console.log("All Zones",allzone)
      } catch (error) {
        console.error('Error fetching zones:', error);

      }
    }
    fetchzones();
  }, [])

  const optionszone = [
    ...allzone.map((zonename) => ({ value: zonename, label: zonename }))
  ]

  const [allstates, setAllstates] = useState([])

  useEffect(() => {
    const fetchstates = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getallstates')
        setAllstates(response.data.allstates)
        // console.log('States',response.data.allstates)
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }
    fetchstates();
  }, [])


  const optionsstate = [
    { value: 'Co.Ed', label: 'Co.Ed' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  const [allcities, setAllcities] = useState([]);

  useEffect(() => {
    const fetchcities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getallcities')
        setAllcities(response.data.allcities)
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }
    fetchcities();
  }, [])


  const optionscities = [
    { value: 'Co.Ed', label: 'Co.Ed' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  const addEmail = () => {

    setMail([...mail, '']);
  };
  const deleteEmail = (index) => {
    const updatedMail = [...mail];
    updatedMail.splice(index, 1);
    setMail(updatedMail);
  };

  const handleEmailChange = (index, value) => {
    const updatedMail = [...mail];
    updatedMail[index] = value;
    setMail(updatedMail);
  };

  const addNumber = () => {

    setMob([...mob, '']);
  };
  const deleteNumber = (index) => {
    const updatedMob = [...mob];
    updatedMob.splice(index, 1);
    setMob(updatedMob);
  };

  const handleNumberChange = (index, value) => {
    const updatedNum = [...mob]; // Create a copy of the emails array
    updatedNum[index] = value; // Update the email at the specified index
    setMob(updatedNum); // Update the state with the modified array
  };



  return (
    <div className="card-text h-full ">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">

          <div>
            <label htmlFor="status" className="form-label items-center">Hospital Type<span style={{ color: 'red' }}>*</span></label>
            <div className="input-area relative flex">
              <div className="flex space-x-4 items-center mb-3">
                <input type="radio" id="Private Hospital" name="HospitalType" value="Private Hospital" onChange={(e) => setColtype(e.target.value)} required />
                <label htmlFor="PrivateHospital" className="text-sm ml-1">Private Hospital</label>
              </div>
              <div className="flex space-x-4 items-center mb-3 ml-5">
                <input type="radio" id="Government Hospital" name="HospitalType" value="Government Hospital" onChange={(e) => setColtype(e.target.value)} required />
                <label htmlFor="GovernmentHospital" className="text-sm ml-1">Government Hospital</label>
              </div>
              <div className="flex space-x-4 items-center mb-3 ml-5">
                <input type="radio" id="semi Government Hospital" name="HospitalType" value="Semi Government Hospital" onChange={(e) => setColtype(e.target.value)} required />
                <label htmlFor="GovernmentHospital" className="text-sm ml-1">Semi Government Hospital</label>
              </div>
            </div>
          </div>

          <div className="input-area">
            <label htmlFor="select" className="form-label">Hospital Category<span style={{ color: 'red' }}>*</span></label>
            <Select options={options} isMulti closeMenuOnSelect={false} placeholder="Select options..." value={options.find((selectedOption) => selectedOption.value === category)} onChange={(selectedOptions) => setCategory(selectedOptions.map(option => option.value))} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Hospital Full Name<span style={{ color: 'red' }}>*</span></label>
            <input type="text" className="form-control" placeholder="Hospital Full Name" value={colfull} onChange={(e) => setColFull(e.target.value)} required />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Hospital Short Name</label>
            <input type="text" className="form-control" placeholder="Hospital Short Name" value={colshort} onChange={(e) => setColshort(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">



          <div className="form-group">
            <label for="exampleFormControlFile1">Hospital Logo<span style={{ color: 'red' }}>*</span></label>
            <input type="file" className="form-control-file mt-2" id="exampleFormControlFile1" accept='.jpg, .jpeg, .png' ref={imginput} onChange={(e) => setFile(e.target.files[0])} required />
            {/* {imgsize1 && <div className="error-message text-red-500 text-xs mt-1">{imgsize1}</div> } */}
          </div>

          <div className="form-group">
            <label for="exampleFormControlFile2">Desktop Cover<span style={{ color: 'red' }}>*</span></label>
            <input type="file" className="form-control-file mt-2" id="exampleFormControlFile2" accept='.jpg, .jpeg, .png' ref={coverinput} onChange={(e) => setCover(e.target.files[0])} required />
            {/* {imgsize2 && <div className="error-message text-red-500 text-xs mt-1">{imgsize2}</div> } */}
          </div>

          <div className="form-group">
            <label for="exampleFormControlFile3">Mobile Cover<span style={{ color: 'red' }}>*</span></label>
            <input type="file" className="form-control-file mt-2" id="exampleFormControlFile3" accept='.jpg, .jpeg, .png' ref={mobinput} onChange={(e) => setMobcover(e.target.files[0])} required />
            {/* {imgsize3 && <div className="error-message text-red-500 text-xs mt-1">{imgsize3}</div> } */}
          </div>


          <div className="input-area relative">
            <label for="largeInput" className="form-label">Departments</label>
            <input type="text" className="form-control" placeholder="Departments" value={Dept} onChange={(e) => setDept(e.target.value)} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Speciality</label>
            <input type="text" className="form-control" placeholder="Speciality" value={spec} onChange={(e) => setSpec(e.target.value)} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Services</label>
            <input type="text" className="form-control" placeholder="Services" value={ser} onChange={(e) => setSer(e.target.value)} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Facilites</label>
            <input type="text" className="form-control" placeholder="Facilites" value={fac} onChange={(e) => setFac(e.target.value)} />
          </div>

          <div className="input-area">
            <label htmlFor="select" className="form-label">Affiliated By<span style={{ color: 'red' }}>*</span></label>
            <Select options={options} closeMenuOnSelect={true} placeholder="Select options..." value={options.find((selectedOption) => selectedOption.value === affby)} onChange={(selectedOption) => setAffby(selectedOption ? selectedOption.value : null)} />
          </div>

          <div className="input-area">
            <label htmlFor="select" className="form-label">Approaved By<span style={{ color: 'red' }}>*</span></label>
            <Select options={options} closeMenuOnSelect={true} placeholder="Select options..." value={options.find((selectedOption) => selectedOption.value === appby)} onChange={(selectedOption) => setAppby(selectedOption ? selectedOption.value : null)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">



          <div className="input-area">
            <label htmlFor="select" className="form-label">Membership By<span style={{ color: 'red' }}>*</span></label>
            <Select options={optionsgender} closeMenuOnSelect={true} placeholder="Select options..." value={options.find((selectedOption) => selectedOption.value === gender)} onChange={(selectedOption) => setGender(selectedOption ? selectedOption.value : null)} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Hospital Established<span style={{ color: 'red' }}>*</span></label>
            <input type="text" className="form-control" placeholder="Hospital Established" value={estab} onChange={(e) => setEstab(e.target.value)} required />
          </div>


        </div>


        <label for="largeInput" className="form-label"> Contact Information</label>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-7">

          <div className="input-area">
            <label htmlFor="select" className="form-label">Countries<span style={{ color: 'red' }}>*</span></label>
            <Select options={optionscountries} closeMenuOnSelect={true} placeholder="Select options..." value={optionscountries.find((selectedOption) => selectedOption.value === allcount)} onChange={(selectedOption) => setAllcount(selectedOption ? selectedOption.value : null)} />
          </div>

          <div className="input-area">
            <label htmlFor="select" className="form-label">Zone<span style={{ color: 'red' }}>*</span></label>
            <Select options={optionszone} closeMenuOnSelect={true} placeholder="Select options..." value={optionszone.find((selectedOption) => selectedOption.value === zone)} onChange={(selectedOption) => setZone(selectedOption ? selectedOption.value : null)} />
          </div>

          <div className="input-area">
            <label htmlFor="select" className="form-label">State<span style={{ color: 'red' }}>*</span></label>
            <Select options={optionsstate} closeMenuOnSelect={true} placeholder="Select options..." value={optionsstate.find((selectedOption) => selectedOption.value === state)} onChange={(selectedOption) => setState(selectedOption ? selectedOption.value : null)} />
          </div>

          <div className="input-area">
            <label htmlFor="select" className="form-label">City<span style={{ color: 'red' }}>*</span></label>
            <Select options={optionscities} closeMenuOnSelect={true} placeholder="Select options..." value={optionscities.find((selectedOption) => selectedOption.value === city)} onChange={(selectedOption) => setCity(selectedOption ? selectedOption.value : null)} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Pin Code<span style={{ color: 'red' }}>*</span></label>
            <input type="text" className="form-control" placeholder="Pin Code" value={pin} onChange={(e) => setPin(e.target.value)} required />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Full Address<span style={{ color: 'red' }}>*</span></label>
            <input type="text" className="form-control" placeholder="Full Address" value={add} onChange={(e) => setAdd(e.target.value)} required />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Locality/Landamrk</label>
            <input type="text" className="form-control" placeholder="Locality/Landmark" value={mark} onChange={(e) => setMark(e.target.value)} />
          </div>

          <div className="input-area relative">
            <label for="largeInput" className="form-label">Official Website</label>
            <input type="text" className="form-control" placeholder="Official Website" value={web} onChange={(e) => setWeb(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-7">

          <div>{mail.map((email, index) => (
            <div key={index} className="flex items-center" style={{ marginTop: '10px' }}>
              <label htmlFor={`email-${index}`} className="form-label flex">Email</label>
              <input type="email" id={`email-${index}`} className="email-input" style={{ width: '900px', marginLeft: '10px' }} placeholder="Enter email" value={email} onChange={(e) => handleEmailChange(index, e.target.value)} />
              {index > 0 && (
                <button className="btn inline-flex justify-center ml-3 bg-red-400" style={{ fontSize: '12px', padding: '4px 6px' }} type="button" onClick={() => deleteEmail(index)}>
                  Delete
                </button>
              )}
            </div>
          ))}
            <button className="btn inline-flex justify-center btn-outline mt-3 bg-green-400" type="button" style={{ padding: '1px 2px' }} onClick={addEmail}>
              Add More Email
            </button>
          </div>

          <div>
            {mob.map((number, index) => (
              <div key={index} className="flex items-center" style={{ marginTop: '10px' }}>
                <label htmlFor={`mob-${index}`} className="form-label flex">Number</label>
                <input type="number" id={`number-${index}`} className="number-input" style={{ width: '900px', marginLeft: '10px' }} placeholder="Enter Number" value={number} onChange={(e) => handleNumberChange(index, e.target.value)} />
                {index > 0 && (
                  <button className="btn inline-flex justify-center ml-3 bg-red-400" style={{ fontSize: '12px', padding: '2px 4px' }} type="button" onClick={() => deleteNumber(index)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button className="btn inline-flex justify-center btn-outline mt-3 bg-green-400" type="button" style={{ padding: '1px 2px' }} onClick={addNumber}>
              Add More Number
            </button>
          </div>
        </div>
        <button className="btn inline-flex justify-center btn-outline-dark" type='submit'>Next</button>
      </form>
    </div>
  )
}

export default GeneralHs
