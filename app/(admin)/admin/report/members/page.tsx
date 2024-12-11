'use client'
import AdminFilter from '@/app/_components/AdminFilter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
  BsEnvelope,
  BsEnvelopeCheck,
  BsEnvelopeDash,
  BsEnvelopeExclamation,
} from 'react-icons/bs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { userAPI } from '@/app/_lib/apis/user'
import { useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import { FormProvider, useForm } from 'react-hook-form'
import { formatSearchDate } from '@/app/_lib/utils'
import CalendarInput from '@/app/_components/CalendarInput'
import { InputWithLabel } from '@/app/_components/InputWithLabel'

const Page = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ทั้งหมด')
  const router = useRouter()
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  const searchParams = useSearchParams()
  const [user, setUser] = useState([])

  const [statusCount, setStatusCount] = useState<any>({
    activeCardCount: 0,
    inActiveCardCount: 0,
    expiredCardCount: 0,
    allCardCount: 0,
  })
  const [filters, setFilters] = useState([
    {
      text: 'ทั้งหมด',
      icon: <BsEnvelope className='text-blue-600 text-xl' />,
      color: 'blue',
      status: '',
      count: 'allCardCount',
    },
    {
      text: 'ยังไม่มีสิทธิ์',
      status: 'inactive',
      icon: <BsEnvelopeDash className='text-orange-600 text-xl' />,
      color: 'orange',
      count: 'inActiveCardCount',
    },
    {
      text: 'บัตรยังไม่หมดอายุ',
      status: 'active',
      icon: <BsEnvelopeCheck className='text-green-600 text-xl' />,
      color: 'green',
      count: 'activeCardCount',
    },
    {
      text: 'บัตรหมดอายุ',
      status: 'expired',
      icon: <BsEnvelopeExclamation className='text-purple-600 text-xl' />,
      color: 'purple',
      count: 'expiredCardCount',
    },
  ])
  const [page] = useState(searchParams.get('page') || '1')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [totalPage, setTotalPage] = useState(0)

  const status = searchParams.get('status')
  const methods = useForm()
  const { handleSubmit, control, getValues, watch, setValue } = methods
  const [prevSearch, setPrevSearch] = useState({
    date: { startDate: null, endDate: null },
    term: '',
  })

  const onSubmit = handleSubmit(async (data) => {
    getUser(status, search, page, formatSearchDate(data.date))
    router.push(
      `/admin/report/members?status=${status}&search=${search}&page=${page}`
    )
  })

  const getUser = async (
    status: string | null,
    search: string | null,
    page: string | null,
    date?: any
  ) => {
    setPrevSearch({
      term: search || '',
      date: {
        startDate: date?.startDate,
        endDate: date?.endDate,
      },
    })
    const res = await userAPI.getUser(token!, {
      status,
      search: prevSearch.term,
      page,
      startDate: prevSearch.date?.startDate || null,
      endDate: prevSearch.date?.endDate || null,
      size: 10,
    })
    const { pagination, data, statusCount } = res.data.data
    setUser(data)
    setStatusCount({
      ...statusCount,
      allCardCount: Object.values(statusCount).reduce(
        (prev: any, cur: any) => prev + cur,
        0
      ),
    })
    setTotalPage(pagination.totalPages)
  }

  const exportUser = async () => {
    const date = getValues('date')
    const q = date?.startDate && date?.endDate ? formatSearchDate(date) : null
    const res = await userAPI.exportUser(
      {
        search: getValues('search'),
        status,
        startDate: q ? q.startDate : null,
        endDate: q ? q.endDate : null,
      },
      token!
    )
    const url = URL.createObjectURL(res.data)
    window.open(url)
  }

  const handleMemberStatus = (status: string) => {
    switch (status) {
      case 'card-active':
        return 'มีสิทธิ์'
      case 'card-inactive':
        return 'ยังไม่มีสิทธิ์'
      case 'card-expired':
        return 'หมดอายุ'
      default:
        return '-'
    }
  }

  useEffect(() => {
    getUser(status, search, page)
  }, [status, page])

  return (
    <div className='flex flex-col w-full h-full gap-6 text-slate-700'>
      <p>สมาชิก</p>
      <div className='grid grid-cols-4 gap-8'>
        {filters.map((filter, i) => (
          <AdminFilter
            key={i}
            {...filter}
            value={statusCount[filter.count]}
            onClick={() =>
              router.push(
                `/admin/report/members?status=${filter.status}&search=${search}&page=${page}`
              )
            }
            isSelected={filter.status === status}
          />
        ))}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='flex gap-8'>
          <Input
            type='string'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='ค้นหา'
            className='bg-white w-full'
          />
          <CalendarInput id='date' placeholder='วันที่' />
          <Button type='submit'>ค้นหา</Button>
          <Button variant='secondary' type='button' onClick={exportUser}>
            ดาวน์โหลด
          </Button>
        </form>
      </FormProvider>
      <div className='bg-slate-50 h-full w-full px-2 rounded-xl flex flex-col justify-between'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>คำนำหน้าชื่อ</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>วันที่หมดอายุ</TableHead>
              <TableHead>จังหวัด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.map((u: any, i) => (
              <TableRow key={i}>
                <TableCell>{u.titleTh}</TableCell>
                <TableCell>
                  {u.firstNameTh} {u.lastNameTh}
                </TableCell>
                <TableCell>{handleMemberStatus(u.memberStatus)}</TableCell>
                <TableCell>
                  {u.cardExpired
                    ? dayjs(new Date(u.cardExpired))
                        .locale('th')
                        .format('DD/MM/YYYY')
                    : '-'}
                </TableCell>
                <TableCell>{u.registrationProvince}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className='items-end justify-end'>
          {/* TODO */}
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/admin/report/members?status=${status}&page=${
                  parseInt(page) > 1 ? parseInt(page) - 1 : 1
                }&search=${search}`}
              />
            </PaginationItem>
            {totalPage <= 4 ? (
              <>
                {[...Array(totalPage)].map((p, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      className={parseInt(page) == i + 1 ? 'text-primary' : ''}
                      href={`/admin/report/members?status=${status}&page=${
                        i + 1
                      }&search=${search}`}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </>
            ) : (
              totalPage - parseInt(page) >= 3 && (
                <>
                  {parseInt(page) != 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/admin/report/members?status=${status}&page=${
                          parseInt(page) - 1
                        }&search=${search}`}
                      >
                        {parseInt(page) - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      className={'text-primary'}
                      href={`/admin/report/members?status=${status}&page=${page}&search=${search}`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={`/admin/report/members?status=${status}&page=${
                        parseInt(page) + 1
                      }&search=${search}`}
                    >
                      {parseInt(page) + 1}
                    </PaginationLink>
                  </PaginationItem>
                  {parseInt(page) == 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href={`/admin/report/members?status=${status}&page=${
                          parseInt(page) + 2
                        }&search=${search}`}
                      >
                        {parseInt(page) + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={`/admin/report/members?status=${status}&page=${totalPage}&search=${search}`}
                    >
                      {totalPage}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )
            )}
            {totalPage - parseInt(page) < 3 && totalPage > 4 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    href={`/admin/report/members?status=${status}&page=${1}&search=${search}`}
                  >
                    {1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={
                      parseInt(page) === totalPage - 2 ? 'text-primary' : ''
                    }
                    href={`/admin/report/members?status=${status}&page=${
                      totalPage - 2
                    }&search=${search}`}
                  >
                    {totalPage - 2}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={
                      parseInt(page) === totalPage - 1 ? 'text-primary' : ''
                    }
                    href={`/admin/report/members?status=${status}&page=${
                      totalPage - 1
                    }&search=${search}`}
                  >
                    {totalPage - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={
                      parseInt(page) === totalPage ? 'text-primary' : ''
                    }
                    href={`/admin/report/members?status=${status}&page=${totalPage}&search=${search}`}
                  >
                    {totalPage}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                href={`/admin/report/members?status=${status}&page=${
                  parseInt(page) == totalPage
                    ? parseInt(page)
                    : parseInt(page) + 1
                }&search=${search}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default Page
