/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manisha.allmybooksarepacked.utility;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.manisha.allmybooksarepacked.db.entity.Book;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;

/**
 *
 * @author ManishaYeramareddy
 */
public class JSONUtils {
    private static final ObjectMapper mapper;

    static {
        mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    public static String objectToJSON(Object object) throws IOException {
        return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
    }

    @SuppressWarnings("unchecked")
    public static <T> T JSONToObject(String json, Class<T> clazz) throws IOException {
        if (clazz == null || clazz.isAssignableFrom(String.class)) return (T) json;
        if (StringUtils.isBlank(json)) return null;
        return mapper.readValue(StringEscapeUtils.unescapeJson(json), clazz);
    }
    
    @SuppressWarnings("unchecked")
    public static <T> List<T> JSONToObjectList(String json, Class<T> elementClass) throws IOException {
        if (StringUtils.isBlank(json)) return (List<T>) Collections.EMPTY_LIST;
        return mapper.readValue(json, mapper.getTypeFactory().constructCollectionType(List.class, elementClass));
    }

    public static void objectToJSONFile(File file, Object object) throws IOException {
        mapper.writeValue(file, object);
    }

    public static <T> T JSONFileToObject(File file, Class<T> clazz) throws IOException {
        return mapper.readValue(file, clazz);
    }

    public static <T> T convertValue(Object obj, Class<T> clazz){
        return mapper.convertValue(obj, clazz);
    }


    public static void main(String[] args) throws IOException {
        Book one = new Book();
        one.setIsbn10(UUID.randomUUID().toString());
        Book two = new Book();
        one.setIsbn10(UUID.randomUUID().toString());
        
        List<Book> bookList = new ArrayList<>();
        bookList.add(one); bookList.add(two);
        System.out.println(objectToJSON(bookList));
    }
    
}
