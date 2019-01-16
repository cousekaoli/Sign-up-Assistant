package com.hust.wxback.dao;

import com.hust.wxback.business.base.IBaseDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IUserDaoTest {

    @Autowired
    IBaseDao ibaseDao;

    @Test
    public void testBaseDao(){
        List all = ibaseDao.findAll();
        System.out.println(all);
    }


}