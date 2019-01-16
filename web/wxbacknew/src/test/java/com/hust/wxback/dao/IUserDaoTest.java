package com.hust.wxback.dao;

import com.hust.wxback.dao.support.IBaseDao;
import com.hust.wxback.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

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