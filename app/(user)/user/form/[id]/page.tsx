'use client'
import React, { useEffect, useState } from 'react'
import { InputWithLabel } from '@/app/_components/InputWithLabel'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckboxWithText } from '@/app/_components/CheckBox'
import { InputFile } from '@/app/_components/InputFile'
import { Button } from '@/components/ui/button'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { userAPI } from '@/app/_lib/apis/user'
import CalendarInput from '@/app/_components/CalendarInput'
import { formAPI } from '@/app/_lib/apis/form'
import ConfirmationDialog from '@/app/_components/ConfirmationDialog'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdError } from 'react-icons/md'
import { useRouter, useParams } from 'next/navigation'
import { fileAPI } from '@/app/_lib/apis/file'
import { handleStatus } from '@/app/_lib/utils'

const Form = () => {
  const router = useRouter()
  const { id } = useParams()
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const methods = useForm({
    defaultValues:
      id === 'request'
        ? {
            departmentName: '',
            formType: 'first-time',
            isCardExpired: false,
            isCardLostorDestroy: false,
            isChangeFirstName: false,
            isChangeFullName: false,
            isChangeLastName: false,
            isCardDestroy: false,
            others: false,
            deliveryChannel: 'registration-address',
          }
        : async () => await getForm(),
  })
  const [address, setAddress] = useState({
    currentAddress: {
      addressNumber: '',
      villageNumber: '',
      road: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
    },
    registrationAddress: {
      addressNumber: '',
      villageNumber: '',
      road: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
    },
  })
  const [open, setOpen] = useState<boolean>(false)
  const [confirmDialog, setConfirmDialog] = useState<any>({
    icon: null,
    desc: null,
    confirmText: '',
    cancelText: '',
    onConfirm: () => undefined,
    onCancel: () => undefined,
  })
  const [disabled, setDisabled] = useState(false)

  const {
    handleSubmit,
    control,
    getValues,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = methods
  const onSubmit = handleSubmit(async (data: any) => {
    if (data.formType !== 'first-time') {
      if (!checkReason()) {
        return
      }
    }
    delete data.others
    data.trainingDate = data.trainingDate?.startDate
    if (typeof data.copyCitizenId == 'string' || data.copyCitizenId == null) {
      delete data.copyCitizenId
    } else {
      data.copyCitizenId = data.copyCitizenId?.length
        ? data.copyCitizenId[0]
        : null
      if (id !== 'request') {
        await fileAPI.patchFile({
          id: data.id,
          file: { field: 'copyCitizenId', file: data.copyCitizenId },
          token: token,
        })
        delete data.copyCitizenId
      }
    }
    if (typeof data.image == 'string' || data.image == null) {
      delete data.image
    } else {
      data.image = data.image?.length ? data.image[0] : null
      if (id !== 'request') {
        await fileAPI.patchFile({
          id: data.id,
          file: { field: 'image', file: data.image },
          token: token,
        })
        delete data.image
      }
    }
    if (typeof data.copyRadioCard == 'string' || data.copyRadioCard == null) {
      delete data.copyRadioCard
    } else {
      data.copyRadioCard = data.copyRadioCard?.length
        ? data.copyRadioCard[0]
        : null
      if (id !== 'request') {
        await fileAPI.patchFile({
          id: data.id,
          file: { field: 'copyRadioCard', file: data.copyRadioCard },
          token: token,
        })
        delete data.copyRadioCard
      }
    }
    if (
      typeof data.departmentCertificate == 'string' ||
      data.departmentCertificate == null
    ) {
      delete data.departmentCertificate
    } else {
      data.departmentCertificate = data.departmentCertificate?.length
        ? data.departmentCertificate[0]
        : null
      if (id !== 'request') {
        await fileAPI.patchFile({
          id: data.id,
          file: {
            field: 'departmentCertificate',
            file: data.departmentCertificate,
          },
          token: token,
        })
        delete data.departmentCertificate
      }
    }
    if (
      typeof data.copyTrainingClass == 'string' ||
      data.copyTrainingClass == null
    ) {
      delete data.copyTrainingClass
    } else {
      data.copyTrainingClass = data.copyTrainingClass?.length
        ? data.copyTrainingClass[0]
        : null
      if (id !== 'request') {
        await fileAPI.patchFile({
          id: data.id,
          file: {
            field: 'copyTrainingClass',
            file: data.copyTrainingClass,
          },
          token: token,
        })
        delete data.copyTrainingClass
      }
    }
    if (typeof data.policeReport == 'string' || data.policeReport == null) {
      delete data.policeReport
    } else {
      data.policeReport = data.policeReport?.length
        ? data.policeReport[0]
        : null
      if (id !== 'request') {
        await fileAPI.patchFile({
          id: data.id,
          file: {
            field: 'policeReport',
            file: data.policeReport,
          },
          token: token,
        })
        delete data.policeReport
      }
    }

    try {
      let res
      if (data.status == 're-submit') {
        res = await formAPI.patchForm(data, token!)
      } else {
        res = await formAPI.newForm(data, token!)
      }
      if (res.status === 201 || res.status === 200) {
        setOpen(true)
        setDisabled(true)
        setConfirmDialog({
          icon: <IoIosCheckmarkCircle className='w-12 h-12 text-green-500' />,
          desc: 'ยื่นคำร้องสำเร็จ',
          confirmText: 'ตรวจสอบสถานะ',
          cancelText: 'ปิด',
          onConfirm: () => router.push('/user/status'),
          onCancel: () => setOpen(false),
        })
      }
    } catch (e: any) {
      setOpen(true)
      setConfirmDialog({
        icon: <MdError className='w-12 h-12 text-red-500' />,
        desc:
          e.status === 409 ? 'ฟอร์มเก่าของคุณยังไม่หมดอายุ' : 'พบข้อผิดพลาด',
        cancelText: 'ปิด',
        onCancel: () => setOpen(false),
      })
    }
  })
  const [formType] = watch(['formType'])
  const [other, setOther] = useState(getValues('otherReason'))
  const [
    isCardExpired,
    isCardLostorDestroy,
    isCardDestroy,
    isChangeFirstName,
    isChangeLastName,
    isChangeFullName,
    otherReason,
  ] = watch([
    'isCardExpired',
    'isCardLostorDestroy',
    'isCardDestroy',
    'isChangeFirstName',
    'isChangeLastName',
    'isChangeFullName',
    'otherReason',
  ])

  const checkReason = () =>
    isCardExpired ||
    isCardLostorDestroy ||
    isCardDestroy ||
    isChangeFirstName ||
    isChangeLastName ||
    isChangeFullName ||
    otherReason != null

  const [noData, setNoData] = useState(false)
  const getUser = async () => {
    let res = await userAPI.getMe(token!)
    let data = res.data.data
    if (data.firstNameTh == null) {
      setNoData(true)
    }
    setAddress({
      currentAddress: {
        addressNumber: data.currentAddressNumber,
        villageNumber: data.currentVillageNumber,
        road: data.currentRoad,
        subDistrict: data.currentSubDistrict,
        district: data.currentDistrict,
        province: data.currentProvince,
        postalCode: data.currentPostalCode,
      },
      registrationAddress: {
        addressNumber: data.registrationAddressNumber,
        villageNumber: data.registrationVillageNumber,
        road: data.registrationRoad,
        subDistrict: data.registrationSubDistrict,
        district: data.registrationDistrict,
        province: data.registrationProvince,
        postalCode: data.registrationPostalCode,
      },
    })
  }

  const disabledField = () =>
    (getValues('status') !== 're-submit' && id !== 'request') || disabled

  const getForm = async () => {
    if (id === 'request') return
    const res = await formAPI.getFormById(id as string, token!)
    let data = res.data.data
    data.trainingDate = {
      startDate: new Date(data.trainingDate).toDateString(),
      endDate: new Date(data.trainingDate).toDateString(),
    }
    delete data.createdAt
    delete data.updatedAt
    delete data.formStatusChangeLogs
    return data
  }

  const getFile = (file: string) => {
    if (!getValues(file) || id === 'request') return
    const res = fileAPI.getFile({
      id: id != 'request' ? btoa(getValues('userId')) : btoa(getValues('id')),
      fileName:
        typeof getValues(file) == 'string'
          ? getValues(file)
          : getValues(file)[0].name,
    })
    window.open(res)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (noData) {
    return (
      <div className='flex flex-col gap-4 pt-4 md:pt-0'>
        <div className='bg-slate-50 p-6 rounded-xl h-full border flex flex-col gap-8'>
          <p>ไม่พบข้อมูล</p>
          <Button onClick={() => router.push('/user/detail')} className='w-40'>
            ข้อมูลส่วนตัว
          </Button>
        </div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 pt-4 md:pt-0'>
        <p className='pl-4'>
          {id === 'request' ? 'คำร้องขอมีบัตร' : 'ข้อมูลฟอร์ม'}
        </p>
        <div className='bg-slate-50 p-6 rounded-xl h-full border flex flex-col gap-8'>
          <p>รับราชการ/ปฏิบัติงานสังกัด</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <InputWithLabel
              type='string'
              name='departmentName'
              label='ชื่อหน่วยงาน'
              disabled={disabledField()}
              rule={{ required: true }}
            />
            <InputWithLabel
              type='string'
              name='departmentDistrict'
              label='อำเภอ'
              disabled={disabledField()}
              rule={{ required: true }}
            />
            <InputWithLabel
              type='string'
              name='departmentProvince'
              label='จังหวัด'
              disabled={disabledField()}
              rule={{ required: true }}
            />
            <InputWithLabel
              type='string'
              name='position'
              label='ตำแหน่ง'
              disabled={disabledField()}
            />
            <InputWithLabel
              type='string'
              name='level'
              label='ระดับ'
              disabled={disabledField()}
            />
            <InputWithLabel
              type='string'
              name='classNumber'
              label='รุ่นที่'
              disabled={disabledField()}
              rule={{ required: true }}
            />
            <CalendarInput
              label='วันที่อบรม'
              id='trainingDate'
              required={true}
              errors={errors}
              asSingle
              disabled={disabledField()}
            />
          </div>
          <span className='w-full h-[1px] bg-slate-200'></span>
          <p>ความประสงค์</p>
          <Controller
            control={control}
            name='formType'
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className='grid grid-cols-1 gap-8 sm:flex sm:gap-16'
                disabled={disabledField()}
              >
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='first-time'
                    id='first-time'
                    className='border-slate-400'
                  />
                  <Label
                    className='font-normal text-slate-800'
                    htmlFor='first-time'
                  >
                    ขอมีบัตรครั้งแรก
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='new-card'
                    id='new-card'
                    className='border-slate-400'
                  />
                  <Label
                    className='font-normal text-slate-800'
                    htmlFor='new-card'
                  >
                    ขอบัตรใหม่
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='change-card'
                    id='change-card'
                    className='border-slate-400'
                  />
                  <Label
                    className='font-normal text-slate-800'
                    htmlFor='change-card'
                  >
                    ขอเปลี่ยนบัตร
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
          <span className='w-full h-[1px] bg-slate-200'></span>
          <div className='flex gap-4 items-center'>
            <p>เหตุผล</p>
            {!checkReason() && formType !== 'first-time' && (
              <p className='text-red-500 text-[12px]'>กรุณาใส่เหตุผล</p>
            )}
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 items-center'>
            <CheckboxWithText
              id='isCardExpired'
              label='บัตรหมดอายุ'
              value={getValues('isCardExpired')}
              onChange={() =>
                setValue('isCardExpired', !getValues('isCardExpired'))
              }
              disabled={formType === 'first-time' || disabledField()}
            />
            <CheckboxWithText
              id='isCardLostorDestroy'
              label='บัตรหายหรือถูกทำลาย'
              value={getValues('isCardLostorDestroy')}
              onChange={() =>
                setValue(
                  'isCardLostorDestroy',
                  !getValues('isCardLostorDestroy')
                )
              }
              disabled={formType === 'first-time' || disabledField()}
            />
            <CheckboxWithText
              id='isCardDestroy'
              label='บัตรชำรุด'
              value={getValues('isCardDestroy')}
              onChange={() =>
                setValue('isCardDestroy', !getValues('isCardDestroy'))
              }
              disabled={formType === 'first-time' || disabledField()}
            />
            <CheckboxWithText
              id='isChangeFirstName'
              label='เปลี่ยนชื่อ'
              value={getValues('isChangeFirstName')}
              onChange={() =>
                setValue('isChangeFirstName', !getValues('isChangeFirstName'))
              }
              disabled={formType === 'first-time' || disabledField()}
            />
            <CheckboxWithText
              id='isChangeLastName'
              label='เปลี่ยนนามสกุล'
              value={getValues('isChangeLastName')}
              onChange={() =>
                setValue('isChangeLastName', !getValues('isChangeLastName'))
              }
              disabled={formType === 'first-time' || disabledField()}
            />
            <CheckboxWithText
              id='isChangeFullName'
              label='เปลี่ยนชื่อและนามสกุล'
              value={getValues('isChangeFullName')}
              onChange={() =>
                setValue('isChangeFullName', !getValues('isChangeFullName'))
              }
              disabled={formType === 'first-time' || disabledField()}
            />
            <CheckboxWithText
              id='others'
              label='อื่นๆ(โปรดระบุ)'
              value={other || getValues('otherReason') != null}
              onChange={() => {
                setOther(!other)
                if (
                  getValues('otherReason') ||
                  getValues('otherReason') == ''
                ) {
                  setOther(false)
                  setValue('otherReason', null)
                }
              }}
              disabled={formType === 'first-time' || disabledField()}
            />
            <InputWithLabel
              type='string'
              rule={{
                required: {
                  value: other,
                  message: 'กรุณากรอกข้อมูล',
                },
              }}
              disabled={
                !(other || getValues('otherReason') != null) || disabledField()
              }
              name='otherReason'
            />
          </div>
          <span className='w-full h-[1px] bg-slate-200'></span>
          <p>เอกสาร</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <InputFile
              label='สำเนาบัตรประชาชน'
              name='copyCitizenId'
              disabled={disabledField()}
              required
              onClick={() => getFile('copyCitizenId')}
            />
            <InputFile
              label='รูปถ่ายขนาด 1 นิ้ว'
              name='image'
              required
              disabled={disabledField()}
              onClick={() => getFile('image')}
            />
            <InputFile
              label='สำเนาประกาศนียบัตรผู้ผ่านการฝึกอบรมหลักสูตร'
              name='copyTrainingClass'
              required
              disabled={disabledField()}
              onClick={() => getFile('copyTrainingClass')}
            />
            <InputFile
              label='หนังสือรับรองจากต้นสังกัด'
              name='departmentCertificate'
              disabled={disabledField()}
              onClick={() => getFile('departmentCertificate')}
            />
            <InputFile
              label='สำเนาบัตรประจำเครื่องวิทยุ (ถ้ามี)'
              name='copyRadioCard'
              disabled={disabledField()}
              onClick={() => getFile('copyRadioCard')}
            />
            <InputFile
              label='เอกสารแจ้งความบัตรสูญหาย (ถ้ามี)'
              name='policeReport'
              disabled={disabledField()}
              onClick={() => getFile('policeReport')}
            />
            <InputWithLabel
              label='ข้อมูลเพิ่มเติม'
              name='remark'
              placeholder='ข้อมูลเพิ่มเติม...'
              disabled
            />
          </div>
          <span className='w-full h-[1px] bg-slate-200'></span>
          <p>เลือกที่อยู่จัดส่ง</p>
          <Controller
            control={control}
            name='deliveryChannel'
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className='grid grid-cols-1 sm:grid-cols-3 gap-16'
                disabled={disabledField()}
              >
                <div className='w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='registration-address'
                      id='registration-address'
                      className='border-slate-400'
                    />
                    <Label
                      className='font-normal text-slate-800'
                      htmlFor='registration-address'
                    >
                      ที่อยู่ตามทะเบียนบ้าน
                    </Label>
                  </div>
                  <span className='w-full h-[1px] bg-slate-200'></span>
                  <div>
                    <p className='text-sm text-slate-700'>
                      ที่อยู่ : {address.registrationAddress.addressNumber} หมู่{' '}
                      {address.registrationAddress.villageNumber} ถนน{' '}
                      {address.registrationAddress.road}{' '}
                      {address.registrationAddress.subDistrict}{' '}
                      {address.registrationAddress.district}{' '}
                      {address.registrationAddress.province}{' '}
                      {address.registrationAddress.postalCode}{' '}
                    </p>
                  </div>
                </div>

                <div className='w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='current-address'
                      id='current-address'
                      className='border-slate-400'
                    />
                    <Label
                      className='font-normal text-slate-800'
                      htmlFor='current-address'
                    >
                      ที่อยู่ปัจจุบัน
                    </Label>
                  </div>
                  <span className='w-full h-[1px] bg-slate-200'></span>
                  <div>
                    <p className='text-sm text-slate-700'>
                      ที่อยู่ : {address.currentAddress.addressNumber} หมู่{' '}
                      {address.currentAddress.villageNumber} ถนน{' '}
                      {address.currentAddress.road}{' '}
                      {address.currentAddress.subDistrict}{' '}
                      {address.currentAddress.district}{' '}
                      {address.currentAddress.province}{' '}
                      {address.currentAddress.postalCode}{' '}
                    </p>
                  </div>
                </div>
                <div className='w-full flex flex-col gap-4 p-4 rounded-lg border border-slate-300'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='self-received'
                      id='self-received'
                      className='border-slate-400'
                    />
                    <Label
                      className='font-normal text-slate-800'
                      htmlFor='self-received'
                    >
                      รับด้วยตัวเอง
                    </Label>
                  </div>
                  <span className='w-full h-[1px] bg-slate-200'></span>
                  <div></div>
                </div>
              </RadioGroup>
            )}
          />
          {/* status === re-submit || id === request */}
          {(getValues('status') == 're-submit' || id == 'request') && (
            <div className='w-full flex items-center justify-center gap-8'>
              <ConfirmationDialog
                open={open}
                icon={confirmDialog.icon}
                desc={confirmDialog.desc}
                confirmText={confirmDialog.confirmText}
                cancelText={confirmDialog.cancelText}
                onConfirm={confirmDialog.onConfirm}
                onCancel={confirmDialog.onCancel}
              >
                <Button className='w-28' type='submit'>
                  บันทึกข้อมูล
                </Button>
              </ConfirmationDialog>
            </div>
          )}
          <span className='w-full h-[1px] bg-slate-200'></span>
          <p>สถานะ : {handleStatus(getValues('status'))}</p>
          <p>ข้อมูลการจัดส่ง : {getValues('adminNote')}</p>
        </div>
      </form>
    </FormProvider>
  )
}

export default Form
