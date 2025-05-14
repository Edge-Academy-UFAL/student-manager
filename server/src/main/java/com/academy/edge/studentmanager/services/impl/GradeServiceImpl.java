package com.academy.edge.studentmanager.services.impl;


import com.academy.edge.studentmanager.dtos.GradeResponseDTO;
import com.academy.edge.studentmanager.dtos.GradeCreateDTO;
import com.academy.edge.studentmanager.dtos.GradeUpdateDTO;
import com.academy.edge.studentmanager.dtos.GradeDeleteDTO;
import com.academy.edge.studentmanager.dtos.StudentGradesDTO;
import com.academy.edge.studentmanager.enums.SubjectStatus;
import com.academy.edge.studentmanager.repositories.StudentRepository;
import com.academy.edge.studentmanager.repositories.GradeRepository;
import com.academy.edge.studentmanager.repositories.SubjectRepository;
import com.academy.edge.studentmanager.services.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.academy.edge.studentmanager.models.Grade;
import com.academy.edge.studentmanager.models.Student;
import com.academy.edge.studentmanager.models.Subject;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import static org.springframework.http.HttpStatus.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;



@Service
@AllArgsConstructor
public class GradeServiceImpl implements GradeService {
    final GradeRepository gradeRepository;
    final StudentRepository studentRepository;
    final SubjectRepository subjectRepository;
    final ModelMapper modelMapper;

    @Autowired
    public GradeServiceImpl(GradeRepository gradeRepository, ModelMapper modelMapper, StudentRepository studentRepository, SubjectRepository subjectRepository) {
        this.gradeRepository = gradeRepository;
        this.modelMapper = modelMapper;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public GradeResponseDTO updateGrade(GradeUpdateDTO gradeUpdateDTO) {

        Student student = studentRepository
                .findByEmail(gradeUpdateDTO.getStudentEmail())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        Grade grade = gradeRepository
                        .findGradeByStudent_IdAndSubject_CodeAndPeriod(
                                student.getId(),
                                gradeUpdateDTO.getSubjectId(),
                                gradeUpdateDTO.getPeriod())
                        .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Grade not found "));

        modelMapper.map(gradeUpdateDTO, grade);
        gradeRepository.save(grade);
        return modelMapper.map(grade, GradeResponseDTO.class);
    }
  
    @Override
    @Transactional
    public GradeResponseDTO saveGrade(GradeCreateDTO gradeCreateDTO) {
        Grade grade = modelMapper.map(gradeCreateDTO, Grade.class);
        try{
            Student student = studentRepository
                    .findByEmail(gradeCreateDTO.getStudentEmail())
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));
            grade.setStudent(student);

            Subject subject = subjectRepository.
                    findSubjectByCode(gradeCreateDTO.getSubjectCode())
                    .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Subject not found"));
            grade.setSubject(subject);

            gradeRepository.save(grade);
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }

        return modelMapper.map(grade, GradeResponseDTO.class);
    }


    @Override
    public List<StudentGradesDTO> getStudentGrades(String email) {
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        List<Grade> grades = gradeRepository.findGradeByStudentId(student.getId());

        List<StudentGradesDTO> studentGrades = new java.util.ArrayList<>();

        grades.sort(Comparator.comparing(Grade::getPeriod));

        for (Grade grade : grades) {
            StudentGradesDTO studentGrade = new StudentGradesDTO();

            modelMapper.map(grade, studentGrade);

            studentGrade.setWorkload(String.valueOf(grade.getSubject().getWorkload()));
            studentGrade.setSubjectCode(grade.getSubject().getCode());
            studentGrade.setName(grade.getSubject().getName());

            studentGrades.add(studentGrade);
        }

        return studentGrades;
    }

    @Override
    @Transactional
    public void deleteGrade(GradeDeleteDTO gradeDeleteDTO) {
        Student student = studentRepository
                            .findByEmail(gradeDeleteDTO.getStudentEmail())
                            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        gradeRepository.deleteGradeByStudentIdAndSubjectCodeAndPeriod(
                            student.getId(),
                            gradeDeleteDTO.getSubjectCode(),
                            gradeDeleteDTO.getPeriod());
    }

    private int getStudentLastGradedPeriod(List<Grade> grades) {
        return grades.stream()
                .filter(grade -> !grade.getSubjectStatus().equals(SubjectStatus.ENROLLED))
                .mapToInt(Grade::getPeriod)
                .max()
                .orElse(0);
    }

    /* This method calculates the IRA based in a weighted average of the Student grades
        and the workload of the subjects of this grades
        See more: https://ufal.br/resolucoes/2023/rco-n-77-de-24-10-2023.pdf (Art. 48) */
    @Override
    public List<Double> getStudentIRAPerPeriod(String email) {
        Student student = studentRepository
                            .findByEmail(email)
                            .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        List<Grade> grades = gradeRepository.findGradeByStudentId(student.getId());

        List<Double> studentIRAPerPeriod = new ArrayList<>();
        List<Double> terms = new ArrayList<>();
        List<Integer> factors = new ArrayList<>();

        for (int i = 1; i <= getStudentLastGradedPeriod(grades); i++) {
            int periodPointer = i;
            List<Grade> pointedPeriodGrades = grades
                    .stream()
                    .filter((grade) -> grade.getPeriod().equals(periodPointer) && !grade.getSubjectStatus().equals(SubjectStatus.ENROLLED))
                    .toList();

            pointedPeriodGrades.forEach((grade) -> {
                terms.add(grade.getFinalGrade() * grade.getSubject().getWorkload());
                factors.add(grade.getSubject().getWorkload());
            });

            double pointedPeriodIRA = terms.stream().mapToDouble(term -> term).sum()
                    / factors.stream().mapToInt(factor -> factor).sum();

            studentIRAPerPeriod.add((double) Math.round(pointedPeriodIRA * 100) / 100);
        }

        return studentIRAPerPeriod;
    }

    @Override
    public List<Double> getStudentGradesAveragePerPeriod(String email) {
        Student student = studentRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Student not found"));

        List<Grade> grades = gradeRepository.findGradeByStudentId(student.getId());

        List<Double> studentGradesAveragePerPeriod = new ArrayList<>();

        for (int i = 1; i <= getStudentLastGradedPeriod(grades); i++) {
            int periodPointer = i;
            List<Grade> pointedPeriodGrades = grades
                    .stream()
                    .filter((grade) -> grade.getPeriod().equals(periodPointer)
                            && !grade.getSubjectStatus().equals(SubjectStatus.ENROLLED))
                    .toList();

            double pointedPeriodGradesAverage = pointedPeriodGrades
                    .stream()
                    .mapToDouble(Grade::getFinalGrade)
                    .average()
                    .orElse(0);

            studentGradesAveragePerPeriod.add((double) Math.round(pointedPeriodGradesAverage * 100) / 100);
        }

        return studentGradesAveragePerPeriod;
    }
}
